const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MongoConnection = await mongoose.connect(process.env.MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log(` Connected successfully to ${MongoConnection.connection.name} DB`);
    } catch (error) {
        console.log("DB Error!", error.message);
    }
};

module.exports = connectDB;
