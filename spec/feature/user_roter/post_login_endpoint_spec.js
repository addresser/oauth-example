const User = container.resolve('User');
const rpn = require('request-promise-native');
const dbConnect = container.resolve('dbConnect');
const ValidationMiddleware = container.resolve('ValidationMiddleware');

let user, userData, options, response;

describe("POST /login endpoint", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
    user = new User(userData);
    await user.save();
  });

  beforeAll(async () => {
    options = {
      uri: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/login`,
      resolveWithFullResponse: true,
      json: true,
      body: {
        email: userData.email,
        password: userData.password,
      }
    };

    response = await rpn.post(options);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should send authenticated user data", () => {
    expect(response.body).toEqual(jasmine.objectContaining({ email: userData.email }));
  });

  it("should send status 200", () => {
    expect(response.statusCode).toEqual(200);
  });

  it("should send session cookie", () => {
    expect(response.headers['set-cookie']).toBeNonEmptyArray();
  });
});
