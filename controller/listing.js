const Listing = require('../models/listing.js');
const axios = require('axios');
const apiKey = "BeP-nTkKoAjx_THpeV8DENLFaTTmbJpuxo1ojcTe9BM";



module.exports.index = async(req,res) => {
    let allListing = await Listing.find();
    res.render("./listings/index.ejs", {allListing});
}

module.exports.renderNewForm = async(req,res) => { 
    res.render("./listings/new.ejs");
}

module.exports.showListing = async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({path: "reviews", populate: {
        path:"author",
    }})
    .populate("owner");

    console.log(listing);
    if(!listing){
        req.flash("error","Listing Does not Exist !");
        res.redirect("/listing");
    }
    else{ 
        res.render("./listings/show.ejs", { listing });
    }

}


module.exports.filteredListing =  async (req, res) => {
    const filterValue = req.query.filter;
    console.log("value",filterValue);
    try {
        const allListing = await Listing.find({ category: filterValue });
       
        res.render("./listings/index.ejs",{allListing});
    } catch (error) {
        res.status(500).send('Error applying filter');
    }
}


module.exports.createListing = async(req, res, next) => {

    let newListing = new Listing(req.body.listing);
    console.log(req.body.listing)

    const address = newListing.location;
    const geocodeUrl  = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;
    const response = await axios.get(geocodeUrl);
    const geocodeData = response.data;

    let url = req.file.path;
    let filename = req.file.filename;

    newListing.owner = req.user._id;
    newListing.image = {url, filename} ;

    const geometry = {
        type: "Point", // Always "Point" for a single location
        coordinates: [geocodeData.items[0].position.lng, geocodeData.items[0].position.lat] // [longitude, latitude]
    };



    newListing.geometry = geometry;

    let savedListing = await newListing.save(); 

    console.log(savedListing);

    req.flash("success","New Listing Created !");
    res.redirect("./listing");

};



module.exports.renderEditForm = async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Does not Exist !");
        return res.redirect("/listing");
    }
    
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("./listings/edit.ejs",{ listing, originalImageUrl});
}

module.exports.updateListing = async(req,res) => {

    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
        req.flash("success","Listing Updated !"); 
    }

    res.redirect(`/listing/${id}`);
}


module.exports.distroyListing = async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Successfully Listing Deleted !");
    res.redirect("/listing");
    // res.send("working");
}