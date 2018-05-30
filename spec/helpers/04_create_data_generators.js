(() => {
  const faker = require('faker');

  let dataGenerators = {
    user() {
      return {
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password(),
      }
    },

    client() {
      return {
        name: faker.internet.domainName(),
        client_id: faker.random.number(),
        client_secret: faker.random.word(),
        redirect_uri: faker.internet.url(),
      }
    }
  };

  global.dataGenerators = dataGenerators;
})();