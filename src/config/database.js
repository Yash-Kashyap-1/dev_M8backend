const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb://kashyapyash49_db_user:labC3s8F76xtmWC9@ac-3dvvxtf-shard-00-00.2wpntfz.mongodb.net:27017,ac-3dvvxtf-shard-00-01.2wpntfz.mongodb.net:27017,ac-3dvvxtf-shard-00-02.2wpntfz.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-19rnqy-shard-0&authSource=admin&appName=Cluster0"
    );
};


module.exports = {connectDB};
