(() => {
  const Dizzy = require('dizzy');
  const diContainerFactory  = require('../../app/service_providers/di_container_factory');

  let container = diContainerFactory(Dizzy);

  container.resolve('appServiceProvider');
  container.resolve('dependenceServiceProvider');

  global.container = container;
})();