module.exports =(createError, User, OAuthClient, OAuthAccessToken,
  OAuthAuthorizationCode, OAuthRefreshToken, cleaner) => {

  return {
    async getClient(clientId, clientSecret) {

      return await OAuthClient.findOneOrError(cleaner({
        client_id: clientId,
        client_secret: clientSecret,
      }));
    },

    async getUser(email, password) {
      let user =  await User.findOneOrError({
        email: email,
      });

      if(!user.verifyPasswordSync(password)) throw createError(400);

      return user;
    },

    async getUserFromClient(client) {
      return await User.findByIdOrError(client.User);
    },

    async getAccessToken(bearerToken) {
      let accessTokken = await OAuthAccessToken.findOneOrError({access_token: bearerToken});

      let user = await User.findByIdOrError(accessTokken.User);
      let oauthClient = await OAuthClient.findByIdOrError(accessTokken.OAuthClient);

      return {
        accessToken: accessTokken.access_token,
        accessTokenExpiresAt: accessTokken.expires,
        scope: accessTokken.scope,
        client: oauthClient,
        user: user
      };
    },

    async saveToken(token, client, user) {
      let accessToken = await OAuthAccessToken.create({
        access_token: token.accessToken,
        expires: token.accessTokenExpiresAt,
        OAuthClient: client._id,
        User: user._id,
        scope: token.scope
      });

      let refreshToken = await OAuthRefreshToken.create({
        refresh_token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        OAuthClient: client._id,
        User: user._id,
        scope: token.scope
      });

      return {
        access_token: accessToken.access_token,
        refresh_token: refreshToken.refresh_token,
        accessToken: accessToken.access_token,
        accessTokenExpiresAt: accessToken.expires,
        refreshToken: refreshToken.refresh_token,
        refreshTokenExpiresAt: refreshToken.expires,
        scope: accessToken.scope,
        client: client,
        user: user
      };
    },

    async revokeToken(token) {
      let revokeToken = await OAuthRefreshToken.findOneOrError({
        refresh_token: token.refresh_token
      });

      await revokeToken.remove();

      return revokeToken;
    },

    async getRefreshToken(refreshToken) {
      let savedRefreshToken = await OAuthRefreshToken.findOneOrError({ refresh_token: refreshToken });

      let user = await User.findByIdOrError(savedRefreshToken.User);
      let oauthClient = await OAuthClient.findByIdOrError(savedRefreshToken.OAuthClient);

      return {
        user: user,
        client: oauthClient,
        refresh_token: savedRefreshToken.refresh_token,
        scope: savedRefreshToken.scope
      };
    },

    async revokeAuthorizationCode(code) {
      let savedCode =  await OAuthAuthorizationCode.findOneOrError({ authorization_code: code.code });

      await savedCode.remove();

      return savedCode;
    },

    async getAuthorizationCode(code) {
      let savedCode = await OAuthAuthorizationCode.findOneOrError({ authorization_code: code });

      let user = await User.findByIdOrError(savedCode.User);
      let oauthClient = await OAuthClient.findByIdOrError(savedCode.OAuthClient);

      return {
        code: savedCode.authorization_code,
        client: oauthClient,
        user: user,
        redirectUri: oauthClient.redirect_uri,
        expiresAt: savedCode.expires,
        scope: savedCode.scope,
      };
    },

    async saveAuthorizationCode(code, client, user) {
      await OAuthAuthorizationCode.create({
        expires: code.expiresAt,
        OAuthClient: client._id,
        authorization_code: code.authorizationCode,
        User: user._id,
        scope: code.scope
      });

      return code;
    },
  };
};