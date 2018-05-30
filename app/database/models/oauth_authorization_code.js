module.exports = (dbConnect, findOrError) => {
  const Schema = dbConnect.Schema;

  let OAuthAuthorizationCodeSchema = new Schema({
    authorization_code: { type: String },
    expires: { type: Date },
    redirect_uri: { type: String },
    scope: { type: String },
    User: {type: Schema.Types.ObjectId, ref: 'User'},
    OAuthClient: {type: Schema.Types.ObjectId, ref: 'OAuthClient'},
  });

  OAuthAuthorizationCodeSchema.plugin(findOrError);

  return dbConnect.model('OAuthAuthorizationCode', OAuthAuthorizationCodeSchema);
};