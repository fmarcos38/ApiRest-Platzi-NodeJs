const passport = require("passport");
//aquí declaro las estrategias que voy a usar (local, jwt, twiter, etc)
const LocalStrategy = require("passport-local").Strategy;

passport.use(LocalStrategy);
