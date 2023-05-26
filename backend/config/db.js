const mongoose = require("mongoose");
const setting = require('../config/setting')

// mettre le lien de la bd dans le .env pour eviter que tous le monde est acces a cette base donnee lors des push sur github
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    if (mongoose.connect(setting.Setting().database_url)) {
      console.log("MONGO CONNECT")
    }
  } catch (err) {
    console.log(err);
    process.exit();
  }
}
module.exports = connectDB;