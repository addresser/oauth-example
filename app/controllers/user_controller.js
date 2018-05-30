module.exports = (User) => {

  class UserController {

    async postLogin(ctx, next) {
      ctx.login(ctx.req.user);

      ctx.body = ctx.req.user;
    }

    async postRegister(ctx, next) {
      let user = new User(ctx.request.body);

      await user.save();

      ctx.login(user);

      ctx.body = user;
    }
  }

  return new UserController();
};
