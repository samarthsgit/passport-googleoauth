import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import appRouter from "./routes/app.js";
import session from "express-session";
import passport from "passport";

dotenv.config();
const app = express();

//Using Passport
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.authenticate('session'));



//Middleware to check login status

app.use("/", appRouter);
app.use("/", authRouter);





app.listen(3000, () => {
    console.log("Listening at Port 3000");
});

