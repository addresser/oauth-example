(() => {
  require('dotenv').config({ path: `${__dirname}/../../environment/.env.test` });

  let envMock = jasmine.createSpy('envMock');

  container.register('env', envMock).asFactory().cached();
})();