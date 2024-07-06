import express from "express";

const router = express.Router()

function isLoggedIn(req, res, next) {
    if(req.user) {
        console.log(req.user);
        next();
    } else {
        res.send("You are unauthorized!");
    }
} 

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.get("/protected", isLoggedIn, (req, res) => {
    const name = req.user.name.givenName;
    res.render("protected.ejs", {name: name});
});

export default router;