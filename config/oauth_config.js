module.exports = {
  accessTokenLifetime: 14400,
  refreshTokenLifetime: 1209600,
  authorizationCodeLifetime: 600,
  grants: [
    'authorization_code',
    'password',
    'refresh_token',
    'client_credentials'
  ],
};