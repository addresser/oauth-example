module.exports = (Router, createError, oauthAdapter) => {

  let oauthRouter = new Router();

  oauthRouter.get('/oauth/authorize',  oauthAdapter.authorize);
  oauthRouter.post('/oauth/token',  oauthAdapter.token);

  return oauthRouter;
};
