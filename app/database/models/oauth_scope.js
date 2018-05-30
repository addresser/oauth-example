module.exports = (dbConnect, findOrError) => {
  const Schema = dbConnect.Schema;

  let OAuthScopeSchema = new Schema({
    scope: { type: String },
    is_default: { type: Boolean },
  });

  OAuthScopeSchema.plugin(findOrError);

  module.exports = dbConnect.model('OAuthScope', OAuthScopeSchema);
};