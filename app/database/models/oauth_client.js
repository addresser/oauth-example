module.exports = (dbConnect, oauthConfig, findOrError) => {
  const Schema = dbConnect.Schema;

  let OAuthClientSchema = new Schema({
    name: { type: String },
    client_id: { type: Number },
    client_secret: { type: String },
    redirect_uri: { type: String },
    grant_types: { type: String },
    scope: { type: String },
    User: {type: Schema.Types.ObjectId, ref: 'User'},
  });

  OAuthClientSchema.plugin(findOrError);

  OAuthClientSchema.virtual('grants').get(function () {
    return oauthConfig.grants
  });

  OAuthClientSchema.virtual('redirectUris').get(function () {
    return [ this.redirect_uri ];
  });

  return dbConnect.model('OAuthClient', OAuthClientSchema);
};