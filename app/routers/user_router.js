module.exports = (Router, userController, localAuthenticator, ValidationMiddleware) => {

  let userRouter = new Router();

  userRouter.post('/register',
    ValidationMiddleware.userValidator.postRegister,
    userController.postRegister
  );

  userRouter.post('/login',
    localAuthenticator.authenticate('local'),
    userController.postLogin,
  );

  return userRouter;
};
