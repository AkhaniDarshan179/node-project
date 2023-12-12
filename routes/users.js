import { authenticateToken, validatePassword } from "../middleware/auth.js";
// const { authenticateToken} = require("../middleware/auth.js")
import express from "express";
import passport from "passport";
import userController from "../controllers/userController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

// router
//   .route("/register", validatePassword)
//   .get((req, res) => res.render("register"))
//   .post(userController.createUser);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/api/register", validatePassword, userController.createUser);

router.route("/login").get((req, res) => res.render("login"));

router.route("/api/login").post(userController.getUser);

router.get("/dashboard", authenticateToken, validatePassword, (req, res) =>
  res.render("dashboard", { user: req.user })
);

router.get("/not-found", (req, res) => {
  res.render("404");
});

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get("/users/update", (req, res) => {
//   res.render("updateUser");
// });

// router.post("/users/update", userController.updateUser);

// router.get(
//   "/auth/google/dashboard",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/dashboard");
//   }
// );

// router.get("/dashboard", authenticateToken, (req, res) => {
//   // Access the authenticated user using req.user
//   res.json({ message: "This is a secure route", user: req.user });
// });

// router.get(
//   "/auth/google/dashboard",
//   passport.authenticate("jwt"),
//   (req, res) => {
//     res.status(200).send({
//       success: true,
//       user: {
//         id: req.user._id,
//         name: req.user.name,
//       },
//     });
//   }
// );

export default router;
