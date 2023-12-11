import express from "express";
import userController from "../controllers/userController.js";
import passport from "passport";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/users", (req, res) => {
  res.render("register");
});

router.get("/users/update", (req, res) => {
  res.render("updateUser");
});

router.post("/users/update", userController.updateUser);

router.post("/users", userController.createUser);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", userController.getUser);

router.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// router.get(
//   "/auth/google/dashboard",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("/dashboard");
//   }
// );

router.get(
  "/auth/google/dashboard",
  passport.authenticate("jwt"),
  (req, res) => {
    res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
      },
    });
  }
);

export default router;
