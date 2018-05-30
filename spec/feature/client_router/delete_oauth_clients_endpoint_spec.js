const faker = require('faker');
const rpn = require('request-promise-native');
const dbConnect = container.resolve('dbConnect');
const OAuthClient = container.resolve('OAuthClient');
const ValidationMiddleware = container.resolve('ValidationMiddleware');

let oauthClient, oauthClientData, options, response;

describe("DELETE /oauth/clients endpoint", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    oauthClientData = dataGenerators.client();
    oauthClient = new OAuthClient(oauthClientData);
    await oauthClient.save();
  });

  beforeAll(async () => {
    options = {
      uri: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/oauth/clients/${oauthClientData.client_id}`,
      resolveWithFullResponse: true,
      json: true,
    };

    response = await rpn.delete(options);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should return deleted client data", async () => {
    expect(response.body).toEqual(jasmine.objectContaining(oauthClientData));
  });

  it("should delete document in database", async () => {
    expect(await OAuthClient.findOne(oauthClientData)).toBeNull();
  });

  it("should send status 200", () => {
    expect(response.statusCode).toEqual(200);
  });
});
