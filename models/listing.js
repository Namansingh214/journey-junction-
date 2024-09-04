const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

let listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
       url: String,
       filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      category: {
        type: String,
        enum: [
          "Select Category",
          "Room",
          "House",
          "Home",
          "Play",
          "Swimming pool",
          "Beach",
          "Building",
          "Farm",
          "Camping",
          "Mountain",
          "Horror"
        ],
      },
});

listingSchema.post("findOneAndDelete",async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in : listing.reviews}});
    }
});


let Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing ;
