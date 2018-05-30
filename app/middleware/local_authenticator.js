module.exports = (User, passport, LocalStrategy, createError) => {

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  });

  passport.use(new LocalStrategy({
      usernameField: "email",
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({
        email: email,
      })
      .then((user) => {
        if(!user.verifyPasswordSync(password)) {
          return done(createError(400));
        }

        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
    }
  ));

  return passport;
};