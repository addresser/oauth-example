module.exports = (container) => {

  /** Модули приложения. */
  container.registerBulk({
    'jwtConfig': `${__dirname}/../../config/jwt_config`,
    'dbConfig': `${__dirname}/../../config/database_config`,
    'oauthConfig': `${__dirname}/../../config/oauth_config`,
    'validateMessages': `${__dirname}/../../resources/lang/ru/validate`,
  }).fromModule()
    .cached();

  /** Модули приложения, выполняемые как фабрики. */
  container.registerBulk({
    /** Модули ../core */
    'app': `${__dirname}/../core/app`,
    'hasher': `${__dirname}/../core/services/hasher`,
    'oauthServer': `${__dirname}/../core/oauth_server`,
    'mongodbModel': `${__dirname}/../core/oauth_server/models/mongodb_model`,

    /** Модули ../database */
    'User': `${__dirname}/../database/models/user`,
    'dbConnect': `${__dirname}/../database/db_connect`,
    'OAuthClient': `${__dirname}/../database/models/oauth_client`,
    'OAuthAccessToken': `${__dirname}/../database/models/oauth_access_token`,
    'OAuthRefreshToken': `${__dirname}/../database/models/oauth_refresh_token`,
    'OAuthAuthorizationCode': `${__dirname}/../database/models/oauth_authorization_code`,

    /** Модули ../middleware */
    'oauthAdapter': `${__dirname}/../middleware/oauth_adapter`,
    'sessionAdapter': `${__dirname}/../middleware/session_adapter`,
    'validator': `${__dirname}/../middleware/validators/validator`,
    'localAuthenticator': `${__dirname}/../middleware/local_authenticator`,

    'userValidator': `${__dirname}/../middleware/validators/user_validator`,

    /** Модули ../routes и ...controllers */
    'userRouter': `${__dirname}/../routers/user_router`,
    'oauthRouter': `${__dirname}/../routers/oauth_router`,
    'clientRouter': `${__dirname}/../routers/client_router`,
    'userController': `${__dirname}/../controllers/user_controller`,
    'clientController': `${__dirname}/../controllers/client_controller`,

    /** Модули ../system */
    'env': `${__dirname}/../system/env`,
    'appRouterStack': `${__dirname}/../system/app_router_stack`,
    'appMiddlewareStack': `${__dirname}/../system/app_middleware_stack`,
    'connectErrorHandler': `${__dirname}/../system/connect_error_handler`,

    /** Конфигурационные модули */
    'appConfig': `${__dirname}/../../config/app_config`,
    'sessionConfig': `${__dirname}/../../config/session_config`,
  }).fromModule()
    .asFactory()
    .cached();

  /** Определение модуля-библиотеки валидации. */
  container.registerBulk({
    "ValidationMiddleware": (userValidator) => {
      return {
        userValidator: userValidator(),
      };
    }
  }).asFactory()
    .cached();
};
