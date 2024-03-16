const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.error(error);
    }
};

module.exports = DBconnection
