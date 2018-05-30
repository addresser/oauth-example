(() => {
  const primalValidationMiddleware = container.resolve('ValidationMiddleware');
  let ValidationMiddlewareMock = jasmine.createSpyObj('ValidationMiddlewareMock', ['postRegister']);
  ValidationMiddlewareMock.postRegister.and.callFake((ctx, next) =>  next());

  const primalSessionAdapter = container.resolve('sessionAdapter');
  let sessionAdapterMock = jasmine.createSpyObj('sessionAdapterMock', ['authenticate']);
  sessionAdapterMock.authenticate.and.callFake((ctx, next) =>  next());

  container.registerBulk({
    ValidationMiddleware: {
      userValidator: {
        postRegister: ValidationMiddlewareMock.postRegister,
      }
    },
    sessionAdapter: sessionAdapterMock,
  }).asValue();

  global.primalModules = {
    sessionAdapter: primalSessionAdapter,
    validationMiddleware: primalValidationMiddleware,
  };
})();
