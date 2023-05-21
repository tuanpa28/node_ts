import { Router } from "express";
// import passport from "../middlewares/passport";
import passport from "passport";
import cookieSession from "cookie-session";
import { signup, signin, authGoogle } from "../controllers/auth";
const router: Router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  
  }),
  authGoogle
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log(req);

    // Successful authentication, redirect to home page.
    res.redirect("/");
  }
);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
