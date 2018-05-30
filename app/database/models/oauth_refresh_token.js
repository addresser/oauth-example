module.exports = (dbConnect, findOrError) => {
  const Schema = dbConnect.Schema;

  let OAuthRefreshTokenSchema = new Schema({
    refresh_token: { type: String },
    expires: { type: Date },
    scope: { type: String },
    User: { type : Schema.Types.ObjectId, ref: 'User' },
    OAuthClient: { type : Schema.Types.ObjectId, ref: 'OAuthClient' },
  });

  OAuthRefreshTokenSchema.plugin(findOrError);

  return  dbConnect.model('OAuthRefreshToken', OAuthRefreshTokenSchema);
};