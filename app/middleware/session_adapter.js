module.exports = (createError) => {

  return {
    async authenticate(ctx, next) {
      if (ctx.isAuthenticated()) {
        return next();
      }

      ctx.throw(createError(401));
    }
  }
};