module.exports = (KeyGrip) => {

  return {
    appKey: new KeyGrip([process.env.APP_KEY], 'sha256'),
  };
};
