import express from "express";
import dotenv from "dotenv";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import passport from "passport";
import session from "express-session";

dotenv.config();
const app = express();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

//Using Passport
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.authenticate('session'));

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    return cb(null, profile);
  }
));

//Middleware to check login status
function isLoggedIn(req, res, next) {
    if(req.user) {
        console.log(req.user);
        next();
    } else {
        res.send("You are unauthorized!");
    }
} 

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/protected", isLoggedIn, (req, res) => {
    const name = req.user.name.givenName;
    res.render("protected.ejs", {name: name});
});

app.get("/auth/google", 
    passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/auth/google/redirect', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect("/protected");
    });





app.listen(3000, () => {
    console.log("Listening at Port 3000");
});

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(user, cb) {
    cb(null, user);
  });