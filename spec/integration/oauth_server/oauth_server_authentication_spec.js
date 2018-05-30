const faker = require('faker');
const User = container.resolve('User');
const dbConnect = container.resolve('dbConnect');
const OAuthClient = container.resolve('OAuthClient');
const OAuthServer = container.resolve('OAuthServer');
const oauthServer = container.resolve('oauthServer');

let userData, user, oauthClientData, oauthClient,
  reqMock, resMock, oauthResponseData, oauthAuthenticationData;

describe("Authentication middleware", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
    user = new User(userData);
    await user.save();

    oauthClientData = dataGenerators.client();
    oauthClient = new OAuthClient(oauthClientData);
    oauthClient.User = user._id;
    await oauthClient.save();
  });

  beforeAll(() => {
    reqMock = new OAuthServer.Request({
      body: {
        client_id: oauthClientData.client_id,
        client_secret: oauthClientData.client_secret,
        username: userData.email,
        password: userData.password,
      },
      headers: {
        'content-length': '',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      query: {},
    });

    resMock = new OAuthServer.Response({
      headers: {}
    });
  });

  beforeAll(async () => {
    reqMock.body['grant_type'] = 'password';

    oauthAuthenticationData = await oauthServer.token(reqMock, resMock);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should return token", async () => {
    reqMock.headers['authorization'] = `Bearer ${oauthAuthenticationData.access_token}`;

    oauthResponseData = await oauthServer.authenticate(reqMock, resMock);

    expect(oauthResponseData).toBeNonEmptyObject();
  });

  describe("when receive incorrect data", () => {
    beforeAll(() => {
      reqMock.body.client_id = faker.random.number();
    });

    it("should throw error", async () => {
      try {
        await oauthServer.token(reqMock, resMock);
      } catch(err) {
        expect(() => { throw err }).toThrowError();
      }
    });
  });
});
