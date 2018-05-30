(() => {
  let app = container.resolve('app');

  app.listen(process.env.APP_PORT, process.env.APP_HOST, (err) => {
    if(err) {
      return console.log('Ошибка запуска тестового сервера.');
    }
    console.log('Тестовый сервер запущен.');
  });
})();