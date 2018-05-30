const http = require('http');
const app = require('./app/app_build');

let server = http.Server(app.callback());

server.listen(process.env.APP_PORT, process.env.APP_HOST);
