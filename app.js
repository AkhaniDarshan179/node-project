import bodyParser from "body-parser";
import connectDB from "./db/connectdb.js";
import express from "express";
import routes from "./routes/users.js";
import session from "express-session";
import passport from "./routes/auth.js";
import './config/passport.js';

const app = express();
const port = 3000;
const DATABASE_URI = "mongodb://127.0.0.1:27017";

connectDB(DATABASE_URI);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Set up the view engine
app.set("view engine", "ejs");

app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());



// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/dashboard",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/dashboard");
//   }
// );

// app.get("/auth/google/dashboard", passport.authenticate("jwt"));

// Load Routes
app.use(routes);

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
