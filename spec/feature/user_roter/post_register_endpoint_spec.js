const User = container.resolve('User');
const rpn = require('request-promise-native');
const dbConnect = container.resolve('dbConnect');
const ValidationMiddleware = container.resolve('ValidationMiddleware');

let userData, user, options, response;

describe("POST /register endpoint", () => {
  beforeAll(async() => {
    await dbConnect.connection;

    dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();

    options = {
      uri: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/register`,
      resolveWithFullResponse: true,
      json: true,
      body: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }
    };
  });

  beforeAll(async () => {
    response = await rpn.post(options);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should send registered user data", () => {
    expect(response.body).toEqual(jasmine.objectContaining({ email: userData.email }));
  });

  it("should send status 200", async () => {
    expect(response.statusCode).toEqual(200);
  });

  it("should create new document in database", async () => {
    user = await User.findOne({ email: userData.email });

    expect(user).toEqual(jasmine.objectContaining({ email: userData.email }));
  });

  it("should send session cookie", () => {
    expect(response.headers['set-cookie']).toBeNonEmptyArray();
  });
});
