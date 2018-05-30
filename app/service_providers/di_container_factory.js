/**
 * @description di_container_factory создает di-контейнер.
 * @module ./service_providers/di_container_factory
 * @param {Dizzy} DIContainerConstructor - конструктор di-контейнера.
 * @return {Dizzy} новый объект Dizzy
 */
module.exports = (DIContainerConstructor) => {

  let container = new DIContainerConstructor();

  container.registerBulk({
    'container': container,
  }).asValue()
    .cached();

  container.registerBulk({
    'appServiceProvider': `${__dirname}/app_service_provider`,
    'dependenceServiceProvider': `${__dirname}/dependence_service_provider`,
  }).fromModule()
    .asFactory()
    .cached()
    .resolve();

  return container;
};
