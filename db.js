const mongoose = require('mongoose')
async function mongoConnect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/aggregationPipeLine")
        console.log("Connection Successfull");
    }
    catch (err) {
        console.log("Connection Fail: ", err.message);
        throw new Error(err.message)
    }
}

module.exports = mongoConnect