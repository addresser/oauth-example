module.exports = (dotenv) => {

  dotenv.config({
    path: `${__dirname}/../../environment/.env.dev`,
  });
};