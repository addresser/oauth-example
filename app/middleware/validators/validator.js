module.exports = (stampit, bindAll, createError) => {

  return stampit({
    methods: {
      _checkValidationResult(ctx, next) {
        if (ctx.errors) {
          return ctx.throw(createError(422, JSON.stringify(ctx.errors)));
        }
      }
    },

    init() {
      bindAll(this);
    }
  });
};