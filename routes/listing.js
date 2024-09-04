const express = require('express');
const Router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require('../cloudConfig.js')
const upload = multer({ storage })

Router
    .route("/")
    .get(wrapAsync(listingController.index))// show all listings index rout
    .post(isLoggedIn,
         upload.single('listing[image]'),
         validateListing,
         wrapAsync(listingController.createListing)
    ); // listing add
   
     
Router.get('/search', async(req, res) => {
    const searchQuery = req.query.search;

    let allListing = await Listing.find({
        $or: [
          { location: { $regex: searchQuery, $options: 'i' } },
          { country: { $regex: searchQuery, $options: 'i' } }
        ]
      }
      );


    if (allListing.length==0) {
        req.flash("error","Listing Does not Exist !");
        res.redirect("/listing");
    } else {
        res.render("./listings/index.ejs", {allListing});
    }
});

Router.get('/filter',listingController.filteredListing);

//new listing form
Router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

Router.route("/:id")
    .get(wrapAsync( listingController.showListing))// show individual listings
    .put( isLoggedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync( listingController.updateListing))// update rout
    .delete( isLoggedIn, isOwner, wrapAsync( listingController.distroyListing))// delete rout


// edit rout
Router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm));









module.exports = Router;
