const faker = require('faker');
const User = container.resolve('User');
const httpMocks = require('node-mocks-http');
const dbConnect = container.resolve('dbConnect');
const OAuthClient = container.resolve('OAuthClient');
const OAuthServer = container.resolve('OAuthServer');
const oauthServer = container.resolve('oauthServer');

let userData, user, oauthClientData, oauthClient,
  reqMock, resMock, oauthResponseData;

describe("Password grunt", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
    user = new User(userData);
    await user.save();

    oauthClientData = dataGenerators.client();
    oauthClient = new OAuthClient(oauthClientData);
    await oauthClient.save();
  });

  beforeAll(async () => {
    reqMock = new OAuthServer.Request({
      body: {
        grant_type: 'password',
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

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should return token", async () => {
    oauthResponseData = await oauthServer.token(reqMock, resMock);

    expect(oauthResponseData.access_token).not.toBeNull();
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
