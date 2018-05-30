module.exports = (env, Koa, appMiddlewareStack, appRouterStack,
  errorHandler, compose, validate, session, appConfig) => {

  let app = new Koa();

  app.keys = appConfig.appKey;

  validate(app);

  app.context.onerror = errorHandler;

  app.use(compose(appMiddlewareStack));

  app.use(compose(appRouterStack));

  return app;
};