const config = F.CONFIG("mongo").config

const mongoose = require('mongoose')

mongoose.connect( config.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false);

mongoose.connection.once('open', function() {
    console.log('\x1b[32m', `- MONGODB - Connected to ${ config.MONGODB_CONNECTION_STRING }`)
});