const Dizzy = require('dizzy');
const diContainerFactory = require('./service_providers/di_container_factory');

let container = diContainerFactory(Dizzy);

let app = container.resolve('app');

module.exports = app;
