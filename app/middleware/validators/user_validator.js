module.exports = (validateMessages, User, stampit, validator) => {

  return stampit(validator, {
    methods: {
      async postRegister(ctx, next) {
        ctx.checkBody('name')
          .trim()
          .notEmpty(validateMessages.notEmpty)
          .len(5, 25, validateMessages.len);
        ctx.checkBody('password')
          .trim()
          .notEmpty(validateMessages.notEmpty)
          .len(5, 20, validateMessages.len);
        ctx.checkBody('email')
          .trim()
          .isEmail(validateMessages.isEmail);

        await this._checkUserExist(ctx);

        this._checkValidationResult(ctx, next);

        return next();
      },

      async _checkUserExist(ctx) {
        let user = await User.findOne({
          email: ctx.request.body.email
        });

        if(user) {
          let error = { email: validateMessages.dataFound };

          ctx.errors ?
            ctx.errors.push(error) :
              ctx.errors = [ error ];
        }
      }
    }
  });
};