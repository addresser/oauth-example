module.exports = (oauthServer, OAuthServer) => {

  return {
    async authorize (ctx) {
      let data = await oauthServer.authorize(
        new OAuthServer.Request(ctx.request),
        new OAuthServer.Response(ctx.res),
      );

      ctx.body = data;
    },

    async token (ctx) {
      let data = await oauthServer.token(
        new OAuthServer.Request(ctx.request),
        new OAuthServer.Response(ctx.res)
      );

      ctx.body = data;
    },

    async authenticate (ctx, next) {
      let data = await oauthServer.authenticate(
        new OAuthServer.Request(ctx.request),
        new OAuthServer.Response(ctx.res),
      );

      next();
    }
  }
};