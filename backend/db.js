const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const connection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected successfully!");
  } catch (e) {
    console.log(`Connection failed! Error: ${e}`);
  };
};
module.exports = connection;
