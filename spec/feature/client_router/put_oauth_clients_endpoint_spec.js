const faker = require('faker');
const rpn = require('request-promise-native');
const dbConnect = container.resolve('dbConnect');
const OAuthClient = container.resolve('OAuthClient');
const ValidationMiddleware = container.resolve('ValidationMiddleware');

let oauthClient, updatedOAuthClient, oauthClientData, options, response;

describe("PUT /oauth/clients endpoint", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    dbConnect.connection.db.dropDatabase();

    oauthClientData = dataGenerators.client();
    oauthClient = new OAuthClient(oauthClientData);
    await oauthClient.save();
  });

  beforeAll(async () => {
    options = {
      uri: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/oauth/clients/${oauthClientData.client_id}`,
      resolveWithFullResponse: true,
      json: true,
      body: dataGenerators.client(),
    };

    response = await rpn.put(options);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should return updated client data", async () => {
    expect(response.body).toEqual(jasmine.objectContaining(options.body));
  });

  it("should update document in database", async () => {
    updatedOAuthClient = await OAuthClient.findOne(options.body);

    expect(updatedOAuthClient).toBeNonEmptyObject();
  });

  it("should send status 200", () => {
    expect(response.statusCode).toEqual(200);
  });
});
