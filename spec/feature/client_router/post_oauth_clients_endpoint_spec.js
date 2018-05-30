const rpn = require('request-promise-native');
const dbConnect = container.resolve('dbConnect');
const OAuthClient = container.resolve('OAuthClient');
const ValidationMiddleware = container.resolve('ValidationMiddleware');

let oauthClientData, registeredOAuthClient, options, response;

describe("POST /oauth/clients endpoint", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    dbConnect.connection.db.dropDatabase();

    oauthClientData = dataGenerators.client();
  });

  beforeAll(async () => {
    options = {
      uri: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/oauth/clients`,
      resolveWithFullResponse: true,
      json: true,
      body: oauthClientData
    };

    response = await rpn.post(options);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should create new document in database", async () => {
    registeredOAuthClient = await OAuthClient.findOne({ client_id: oauthClientData.client_id });

    expect(registeredOAuthClient).toEqual(jasmine.objectContaining(oauthClientData));
  });

  it("should send status 200", () => {
    expect(response.statusCode).toEqual(200);
  });
});
