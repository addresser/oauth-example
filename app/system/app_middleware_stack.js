module.exports = (helmet, bodyParser, session, sessionConfig,
  localAuthenticator, koa404Handler, cors) => {

  return [
    cors(),
    helmet(),
    bodyParser(),
    koa404Handler,
    session(sessionConfig),
    localAuthenticator.initialize(),
    localAuthenticator.session(),
  ];
};