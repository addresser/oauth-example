const User = container.resolve('User');
const dbConnect = container.resolve('dbConnect');

let userData, user;

describe("mogoose model", () => {

  beforeAll(async () => {
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should create new document", async () => {
    user = new User(userData);

    await user.save();

    let newDoc = await User.findOne({ email: userData.email });

    expect(newDoc).toEqual(jasmine.objectContaining({name: userData.name, email: userData.email}));
  });

});
