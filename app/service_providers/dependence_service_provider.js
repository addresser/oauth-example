module.exports = (container) => {

  /** Встроенные модули и загружаемые зависимости. */
  container.registerBulk({
    'ejs': 'ejs',
    'Koa': 'koa',
    'jwt': 'koa-jwt',
    'crypto': 'crypto',
    'dotenv': 'dotenv',
    'moment': 'moment',
    'cors': '@koa/cors',
    'KeyGrip': 'keygrip',
    'stampit': 'stampit',
    'bindAll': 'bind-all',
    'mongoose': 'mongoose',
    'helmet': 'koa-helmet',
    'Router': 'koa-router',
    'compose': 'koa-compose',
    'useStrict': 'use-strict',
    'cleaner': 'deep-cleaner',
    'validate': 'koa-validate',
    'passport': 'koa-passport',
    'hidden': 'mongoose-hidden',
    'bcrypt': 'mongoose-bcrypt',
    'createError': 'http-errors',
    'bodyParser': 'koa-bodyparser',
    'OAuthServer': 'oauth2-server',
    'restRouter': 'koa-rest-router',
    'session': 'koa-generic-session',
    'redisSessionStore': 'koa-redis',
    'LocalStrategy': 'passport-local',
    'koa404Handler': 'koa-404-handler',
    'findOrError': 'mongoose-find-or-error',
    'errorHandler': 'koa-better-error-handler',
  }).fromModule()
    .cached();
};
