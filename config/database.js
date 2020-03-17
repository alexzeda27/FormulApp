const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Connected to database successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectionDB;