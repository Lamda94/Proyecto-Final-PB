exports.authHandler = (req, res, next) => {
    if (req.session && req.session.name) {
      return next();
    }

    return res.sendStatus(401);
};