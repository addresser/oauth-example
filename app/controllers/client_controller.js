module.exports = (OAuthClient) => {

  return {
    async getClients(ctx, next) {

      ctx.body = await OAuthClient.find({ User: ctx.req.user._id });
    },

    async postClients(ctx, next) {
      let client = new OAuthClient(ctx.request.body);

      await client.save();

      ctx.body = client;
    },

    async putClients(ctx, next) {

      ctx.body = await OAuthClient.findOneAndUpdate(
        { client_id: ctx.params.client },
        ctx.request.body,
        { new: true }
      );
    },

    async deleteClients(ctx, next) {

      ctx.body = await OAuthClient.findOneAndRemove({ client_id: ctx.params.client });
    }
  };
};
