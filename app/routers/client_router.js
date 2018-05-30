module.exports = (restRouter, clientController, sessionAdapter) => {

  let clientRouter = restRouter({ prefix: '/oauth' });

  clientRouter.resource('clients', {
    index: [
      sessionAdapter.authenticate,
      clientController.getClients
    ],

    create: clientController.postClients,

    update: clientController.putClients,

    remove: clientController.deleteClients,
  });

  return clientRouter;
};