module.exports = {
  apps : [
    {
      name: 'oauth-example',
      script: './server.js',
      watch: true,
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true
    }
  ]
};
