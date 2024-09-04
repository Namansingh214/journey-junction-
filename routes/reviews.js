const express = require('express');
const Router = express.Router({mergeParams: true}); 
const wrapAsync = require('../utils/wrapAsync.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require('../controller/reviews.js');


// Add Reviews Post Route
Router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


// Reviews delete Route
Router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.distroyReview));

module.exports = Router;