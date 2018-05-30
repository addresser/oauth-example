module.exports = (mongodbModel, oauthConfig, OAuthServer) => {

  let oauthServer = new OAuthServer({
    model: mongodbModel,
    accessTokenLifetime: oauthConfig.accessTokenLifetime,
    refreshTokenLifetime: oauthConfig.refreshTokenLifetime,
    authorizationCodeLifetime: oauthConfig.authorizationCodeLifetime,
  });

  return oauthServer;
};