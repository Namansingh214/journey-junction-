const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.atlasdb;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("some");
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  // await Listing.deleteMany({});
  // initData.data = initData.data.map((obj) => ({
  //   ...obj,
  //    owner: "66d8494bc6224c3e77f71520",
  //   }));
    
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
