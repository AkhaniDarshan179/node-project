import authenticateToken from "../middleware/auth.js";
import express from "express";
import passport from "passport";
import userController from "../controllers/userController.js";
const router = express.Router();

// Home Page
router.get("/", (req, res) => {
  res.render("home");
});

// Sign Up Page
router
  .route("/register")
  .get((req, res) => res.render("register"))
  .post(userController.createUser);

// Login Page
router.route("/login").get((req, res) => res.render("login"));

router.route("/api/login").post(userController.getUser);

// Dashboard Page
router.get("/dashboard", (req, res) =>
  res.render("dashboard", { user: req.user })
);

// 404 Page
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
