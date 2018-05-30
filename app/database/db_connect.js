module.exports = (mongoose, dbConfig, connectErrorHandler) => {

  let protocol = dbConfig.mongoDB.dbProtocol;
  let host = dbConfig.mongoDB.dbHost;
  let port = dbConfig.mongoDB.dbPORT;
  let db = dbConfig.mongoDB.dbName;

  mongoose.Promise = Promise;

  mongoose.connect(
    `${protocol}://${host}:${port}/${db}`,
    dbConfig.mongoDB.options
  )
  .catch(connectErrorHandler);

  return mongoose;
};
