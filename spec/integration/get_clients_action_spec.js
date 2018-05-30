const app = container.resolve('app');
const User = container.resolve('User');
const rpn = require('request-promise-native');
const dbConnect = container.resolve('dbConnect');
const OAuthClient = container.resolve('OAuthClient');
const clientController = container.resolve('clientController');
const ValidationMiddleware = container.resolve('ValidationMiddleware');

let user, userData, oauthClient, oauthClientData,
  response, ctxMock, nextMock;

describe("getClients action", () => {

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

    spyOn(OAuthClient, 'find').and.callThrough();
  });

  beforeAll(async () => {
    ctxMock = {
      req: {
       user: user,
      }
    };

    response = await clientController.getClients(ctxMock, nextMock);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should find clients", async () => {
    expect(OAuthClient.find).toHaveBeenCalledWith({ User: user._id });
  });
});
