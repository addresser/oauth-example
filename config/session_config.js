module.exports =  (redisSessionStore) => {
  return {
    key: process.env.SESSION_KEY,
    prefix: process.env.SESSION_PREFIX,
    store: redisSessionStore({
      port: process.env.SESSION_STORE_DB_PORT,
      host: process.env.SESSION_STORE_DB_HOST,
      db: process.env.SESSION_STORE_DB_NAME,
    }),
    rolling: false,
    cookie: {
      path: '/',
      overwrite: true,
      httpOnly: true,
      signed: true,
    }
  };
};
