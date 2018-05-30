module.exports = (userRouter, clientRouter,  oauthRouter) => {
  return [
    oauthRouter.routes(),
    oauthRouter.allowedMethods(),

    userRouter.routes(),
    userRouter.allowedMethods(),

    clientRouter.middleware(),
  ];
};