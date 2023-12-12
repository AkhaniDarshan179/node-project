import bodyParser from "body-parser";
import connectDB from "./db/connectdb.js";
import express from "express";
import routes from "./routes/users.js";
import session from "express-session";
import passport from "./config/passport.js";
import './config/passport.js';
import path from "path";

const app = express();
const port = 3000;
const DATABASE_URI = "mongodb://127.0.0.1:27017";

connectDB(DATABASE_URI);

app.use('/public', express.static(path.join('public')));
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


// Load Routes
app.use(routes);

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
