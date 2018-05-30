module.exports = (dbConnect, findOrError) => {
  const Schema = dbConnect.Schema;

  let OAuthAccessTokenSchema = new Schema({
    access_token: { type: String },
    expires: { type: Date },
    scope:  { type: String },
    User:  { type : Schema.Types.ObjectId, ref: 'User' },
    OAuthClient: { type : Schema.Types.ObjectId, ref: 'OAuthClient' },
  });

  OAuthAccessTokenSchema.plugin(findOrError);

  OAuthAccessTokenSchema.virtual('accessTokenExpiresAt').get(function () {
    return this.expires;
  });

  OAuthAccessTokenSchema.virtual('user').get(function () {
    return this.User;
  });

  OAuthAccessTokenSchema.virtual('client').get(function () {
    return this.OAuthClient;
  });

  return dbConnect.model('OAuthAccessToken', OAuthAccessTokenSchema);
};