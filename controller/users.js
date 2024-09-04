const User = require('../models/user.js');

module.exports.signup = async (req, res,next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listing");
        })
          
    } catch (error) {
        req.flash("error","Welcome to Wanderlust")
        res.redirect("/signup");
    }    
}

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
}


module.exports.login = async (req, res) => { 
    req.flash("success","Welcome Back to Wanderlust ");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listing");
    })
}