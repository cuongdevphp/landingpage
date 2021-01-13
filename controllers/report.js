const cron = require('node-cron');

const REGION = F.MODEL("region.entity").schema;

const BRAND = F.MODEL("brand.entity").schema;

const BROKER = F.MODEL("broker.entity").schema;

const DRAFT = F.MODEL("draft.entity").schema;

const CUSTOMER = F.MODEL("customer.entity").schema;

const moment = require('moment');

//0 */10 * * * * every 10 minutes
cron.schedule('*/10 * * * *', async () => {
    console.log('Running a task every 10th minute at', moment().format('YYYY-MM-DD HH:mm:ss'));

    let lastTowHour = moment().subtract(2, 'hours');

    let drafts = await DRAFT.find({ 
        createdAt: { 
            $lt: lastTowHour
        },
        assign_to_user: null,
        // completedAt: null
    });

    if (drafts.length === 0) { 
        console.log('No drafts found, last checked time at ', moment().format('YYYY-MM-DD HH:mm:ss'));
        return;
    }

    let brokers = await BROKER.find().sort({count_draft: 1});


    let brokersIndexByRegionAndBrand = {};
    let objBrokers = brokers.reduce((obj, br) => {
        br = br.toObject();
        if (obj[br.region] === undefined) {
            obj[br.region] = {
                [br.brand]: [br]
            };
            brokersIndexByRegionAndBrand[br.region] = {};
        } else {
            if (obj[br.region][br.brand] === undefined) {
                obj[br.region][br.brand] = [br];
            } else {
                obj[br.region][br.brand].push(br);
            }
        }
        brokersIndexByRegionAndBrand[br.region][br.brand] = 0;
        return obj;
    }, {});

    let brands = await BRAND.find().sort({count_draft: 1});

    let regions = await REGION.find().sort({count_draft: 1});

    regions = regions.map(region => region.toObject());


    let branchesIndex = {};
    let brandsByRegion = brands.reduce((obj, br) => {
        br = br.toObject();
        if (obj[br.region] == undefined) {
            obj[br.region] = [br.name];
            branchesIndex[br.region] = 0;
        } else {
            obj[br.region].push(br.name);
        }
        return obj;
    }, {});

    let draftsPromise = [],
        customersPromise = [],
        brandsPromise = [],
        brokersPromise = [],
        regionsPromise = [];

    let objBrandsUpdate = {}, 
        objBrokersUpdate = {},
        objRegionsUpdate = {};

    for (let draft of drafts) {
        let reg = draft.brand;
        let brand = brandsByRegion[reg][branchesIndex[reg]];
        let brokerIndex = brokersIndexByRegionAndBrand[reg][brand];
        let broker = objBrokers[reg][brand][brokerIndex];
        if (broker) {
            draftsPromise.push(
                DRAFT.updateOne({_id: draft._id}, {assign_to_user: broker.email}, { upsert: false, new: false })
            )
            customersPromise.push(
                CUSTOMER.updateOne({draftId: draft._id}, {
                    broker: broker.email,
                    agency: broker.brand,
                    manage_by: {
                        broker,
                        brand: brands.find(b => b.name === broker.brand) || null,
                        region: regions.find(region => region.name === broker.region) || null
                    }
                }, { upsert: false, new: false })
            )
            objRegionsUpdate[broker.region] = objRegionsUpdate[broker.region] ? objRegionsUpdate[broker.region] + 1 : 1;
            objBrandsUpdate[broker.brand] = objBrandsUpdate[broker.brand] ? objBrandsUpdate[broker.brand] + 1 : 1;
            if (objBrokersUpdate[broker.email] === undefined) {
                objBrokersUpdate[broker.email] = {
                    id: broker._id,
                    updateCount: 1
                };
            } else {
                objBrokersUpdate[broker.email].updateCount++;
            }
            
            branchesIndex[reg]++;
            brokersIndexByRegionAndBrand[reg][brand]++;

            if (brokersIndexByRegionAndBrand[reg][brand] >= objBrokers[reg][brand].length) {
                brokersIndexByRegionAndBrand[reg][brand] = 0;
            }
            if (branchesIndex[reg] >= brandsByRegion[reg].length) {
                branchesIndex[reg] = 0;
            }
        }
    }

    let keys = Object.keys(objRegionsUpdate);

    for (let key of keys) {
        regionsPromise.push(
            REGION.updateOne({name: key}, {$inc: {count_draft: objRegionsUpdate[key]}}, { upsert: false, new: false })
        )
    }

    keys = Object.keys(objBrandsUpdate);

    for (let key of keys) {
        brandsPromise.push(
            BRAND.updateOne({name: key}, {$inc: {count_draft: objBrandsUpdate[key]}}, { upsert: false, new: false })
        )
    }

    keys = Object.keys(objBrokersUpdate);

    let emailPromise = [];

    for (let key of keys) {
        brokersPromise.push(
            BROKER.updateOne({email: key}, {$inc: {count_draft: objBrokersUpdate[key].updateCount}}, { upsert: false, new: false })
        );
        let payload = { token: objBrokersUpdate[key].id, type: "draft_data", email: key, no: objBrokersUpdate[key].updateCount }
        emailPromise.push(
            F.SERVICE("rabbit").sendMail(JSON.stringify(payload))
        )
    }

    await Promise.all(brokersPromise);
    await Promise.all(brandsPromise);
    await Promise.all(regionsPromise);
    await Promise.all(draftsPromise);
    await Promise.all(customersPromise);
    await Promise.all(emailPromise);

}, {
    scheduled: true,
});

cron.schedule('0 12,18 * * *', async () => {
    console.log('Running a task every day at 12h and 18h: ', moment().format('YYYY-MM-DD HH:mm:ss'));
    let customers = await CUSTOMER.find({
        account_number: { $ne: null },
        id_number: { $ne: null },
        status: { $in: ['CS_CONFIRM', 'COMPLETED_CONTRACT'] }
    });
    console.log(`Found ${customers.length} customers`);
    if (!customers.length) {
        return;
    }
    let arr = [];
    for (const customer of customers) {
        let checked = await F.SERVICE('ekyc').checkNationalId(customer.id_number);
        if (!checked) {
            let status = customer.status;
            if (status === 'CS_CONFIRM') {
                status = 'WAITING_COMPLETE';
            } else if (status === 'COMPLETED_CONTRACT') {
                status = 'COMPLETED';
            }
            arr.push(
                CUSTOMER.updateOne({_id: customer._id}, {
                    status: 'COMPLETED'
                }, { upsert: false, new: false })
            )
        }        
    }
    console.log(`Found ${arr.length} account completed`);
    if (arr.length) {
        await Promise.all(arr);
    }

}, {
    scheduled: true,
});
