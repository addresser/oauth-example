module.exports = (dbConnect, hidden, bcrypt, findOrError) => {
  const Schema = dbConnect.Schema;

  let UserSchema = new Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String, hideJSON: true, bcrypt: true },
  });

  UserSchema.plugin(bcrypt);
  UserSchema.plugin(hidden());
  UserSchema.plugin(findOrError);

  return dbConnect.model('User', UserSchema);
};