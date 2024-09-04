const express = require('express');
const Router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const flash = require('connect-flash');
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js");
const userController = require('../controller/users.js');

Router.route("/signup")
    .get( userController.renderSignupForm)
    .post( wrapAsync(userController.signup));


Router.route("/login")
    .get( userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", 
    { failureRedirect: "/login", failureFlash: true, }), 
    userController.login
    );


Router.get("/logout", userController.logout)


module.exports = Router;