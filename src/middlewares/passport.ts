import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "307821829987-2vefqqddrh2sm2b3b4lgb4q893crdg8e.apps.googleusercontent.com",
      clientSecret: "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",
 
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      try {
      } catch (error) {
        done(error, false);
      }
    }
  )
);
export default passport;
