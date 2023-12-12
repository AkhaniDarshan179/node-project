import UserModel from "../model/User.js";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Random String";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await UserModel.findOne({ _id: jwt_payload.id });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

async function findOrCreate(query, data) {
  let user = await UserModel.findOne(query);

  if (!user) {
    user = await UserModel.create(data);
  }

  return user;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: "415693819109-087mrikl2mrns22irlq2hai6vklumok5.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/dashboard",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingUser = await findOrCreate(
          { googleId: profile.id },
          {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          }
        );

        return cb(null, existingUser);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

export default passport;

