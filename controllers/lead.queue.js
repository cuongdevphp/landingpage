/**
 * Consume Distribution of lead
 * Send new lead to user and update the log
 */
const fs = require('fs').promises;
const _ = require('lodash');
let channel = F.SERVICE("rabbit").channel
let config = F.CONFIG("rabbit").config;

const fetch = require('node-fetch');

const REGISTRATION = F.MODEL("register.entity").schema;

const QUEUE = F.MODEL("queue.entity").schema;

const REGION = F.MODEL("region.entity").schema;

const BRAND = F.MODEL("brand.entity").schema;

const BROKER = F.MODEL("broker.entity").schema;

const DRAFT = F.MODEL("draft.entity").schema;

const CUSTOMER = F.MODEL("customer.entity").schema;

let file = "./resource/rules.json";

const { getContractsByUser } = require('../utils/common');

//this is not optimize due to recursive, but to make sure, read file again
async function distribute_to_next_person (entry, registration) {
    try {

        if (registration == null) {
            console.log(`No registration of${entry.token} found`);
            return;
        }

        let data = await fs.readFile(file, 'utf-8');

        data = JSON.parse(data.toString());

        // get all regions with current count below max
        let available_regions = _.filter(data.region, function(region) {
            return region.count < region.max;
        })
         console.log('distribute_to_next_person lable_regions.length < 1', data)
        if (available_regions.length < 1) { 
            data.region.forEach(currentRegion => currentRegion.count = 0);
            await fs.writeFile(file, JSON.stringify(data, null, 4));
            await resetRegionData();
            console.log('No region Found, should reset here');
            return await distribute_to_next_person(entry, registration);
        }

        // Lowest count on top, since lowest count will receive mail
        available_regions = _.orderBy(available_regions, ["count"], ["asc"]);

        // if region from entry is found in the list, then priority it
        let region = _.find(available_regions, function(region) {
            return region.name == entry.region;
        })

        // if no region is priority, take the first available region with lowest count
        region = region != null ? region : available_regions[0]; // could be any region with lowest count

        // get all brands in regions
        let brands = _.filter(data.brands, function(brand) {
            return brand.region == region.name && brand.count < brand.max;
        })

        if (brands.length < 1) {
            data.brands.forEach(currentBrand => {
                if (currentBrand.region == region.name) {
                    currentBrand.count = 0;
                }
            });
            await fs.writeFile(file, JSON.stringify(data, null, 4));
             console.log('No Brands Found, should reset brands here');
            await resetBrandData();
            return await distribute_to_next_person(entry, registration);
        }

        // Lowest count on top, since lowest count will receive mail
        brands = _.orderBy(brands, ['count', 'asc']);

        let brand = brands[0]; console.log("brand", brand);

        let users = _.filter(data.users, function(user) {
            return user.brand == brand.name && user.region == region.name;
        });

        let isMultipleUser, user, payload;
        
        if (users.length < 1) {
            //No user
            isMultipleUser = false;
        } else {
            isMultipleUser = true;
            // have user but no quota
            users = _.filter(users, function (user) {
                return user.count < user.max;
            })

            if (users.length < 1){
                data.users.forEach(currentUser => {
                    if (currentUser.region == region.name && currentUser.brand == brand.name) {
                        currentUser.count = 0;
                    }
                });

                await fs.writeFile(file, JSON.stringify(data, null, 4));
                await resetBrokerData();
                 console.log('No Users Found, should reset users here');
                return await distribute_to_next_person(entry, registration);
            }
        }

        let assign_to_user = null, draft = null;

        if (registration.draftId) {
            draft = await DRAFT.findOne({ _id: registration.draftId });
            assign_to_user = draft ? draft.assign_to_user : null;
            if (assign_to_user) {
                let tempUser = await BROKER.findOne({email: assign_to_user });
                if (tempUser) {
                    let tempBrand = await BRAND.findOne({ name: tempUser.brand });
                    if (tempBrand) {
                        let tempRegion = await REGION.findOne({ name: tempBrand.region });
                        if (tempRegion) {
                            region = tempRegion.toObject();
                            
                            brand = tempBrand.toObject();

                            user = tempUser.toObject();
                        }
                    }
                }
            }
        }
        
        try {
            if (isMultipleUser == true) {
                users = _.orderBy(users, ['count', 'asc']);
                if (!user) {
                    user = users[0];
                }
                if (user) {
                    region.count += 1;
                    brand.count += 1;
                    user.count += 1;
                    await BROKER.updateOne({ email: user.email }, { count: user.count }, { upsert: false, new: false });
                    data.users.forEach(us => {
                        if (us.email === user.email) {
                            us.count = user.count;
                        }
                    });
                    if (draft) {
                        await DRAFT.updateOne({_id: draft._id}, {assign_to_user: user.email}, { upsert: false, new: false })
                        await CUSTOMER.updateOne({draftId: draft._id}, {
                                broker: user.email,
                                agency: brand.name,
                                manage_by: {
                                    broker: user,
                                    brand,
                                    region
                                }
                            },
                        { upsert: false, new: false })
                    }
                }

                payload = { token: entry.token, type: "report", username: entry.username, email: user.email, name: user.name, cc: brand.cc, cc_name: brand.cc_name, no: brand.count }
            } else {
                region.count += 1;
                brand.count += 1;
                payload = { token: entry.token, type: "report", username: entry.username, email: brand.cc, name: brand.cc_name, no: brand.count }
            }        
            
            //LOG
            new QUEUE({ 
                to: user ? user.email : brand.cc,
                cc: user ? brand.cc : null,
                id_number: registration.id_number,
                hash: entry.token
            }).save();

            data.region.forEach(rg => {
                if (rg.name === region.name) {
                    rg.count = region.count;
                }
            });

            data.brands.forEach(br => {
                if (br.name === brand.name) {
                    br.count = brand.count;
                }
            });

            //UPDATE COUNTER
            await REGION.updateOne({ name: region.name }, { count: region.count }, { upsert: true, new: false });
            
            await BRAND.updateOne({ name: brand.name }, { count: brand.count }, { upsert: true, new: false });


            //UPDATE REGISTRATION
            REGISTRATION.findOneAndUpdate({ hash: entry.token }, { sent: true }).exec();

            //UPDATE COUNT
            await fs.writeFile(file, JSON.stringify(data, null, 4));
            console.log(`F.SERVICE("rabbit").sendMail with registration: ${registration}`)
            await F.SERVICE("rabbit").sendMail(JSON.stringify({ contracts: getContractsByUser(registration), email: registration.email, name: registration.name, type: "contracts" }));
            //SEND MAIL
            return await F.SERVICE("rabbit").sendMail(JSON.stringify(payload));

        } catch (err) {
            console.error(err)
            console.log('error');

            return null
        }

    }catch(er) {
    

        console.error('distribute_to_next_person error', er);
        return null;
}
}

async function resetRegionData() {
    await REGION.updateMany({}, {count: 0, count_draft: 0}, { upsert: true, new: false });
}

async function resetBrandData() {
    await BRAND.updateMany({}, {count: 0, count_draft: 0}, { upsert: true, new: false });
}

async function resetBrokerData() {
    await BROKER.updateMany({}, {count: 0, count_draft: 0}, { upsert: true, new: false });
}

exports.install = function () {

    channel.prefetch(1);

    console.log('\x1b[32m', `- RABBIT-QUEUE - Registered to ${ config.person_queue }`)

    channel.consume(config.person_queue, async function(msg) {
        try {

            let payload = JSON.parse(msg.content.toString());

            console.log('payload QUEUE', payload);
            if (payload.type == "next_person") {
                let registration = await REGISTRATION.findOne({ hash: payload.token }).exec();
                let entry = { region: payload.region, token: payload.token, username: payload.username }
                console.log('next_person chanel with entry ', entry);
                await distribute_to_next_person(entry, registration);
                channel.ack(msg);
            }
            if (payload.type == "register_core") {
                console.log('queue register core with payload', payload)
                let result = await fetch(process.env.REGISTER_CORE_URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(payload.body),
                    timeout: 60000
                })
                console.log('response ', result)
                channel.ack(msg);
            }

        }catch(error) {
            console.log("Fail SEND Lead", error)
        }
    });
}
