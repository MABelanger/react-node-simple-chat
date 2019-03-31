'use strict';

// Add headers to enable Cross-origin resource sharing (CORS)
module.exports = function (req, res, next) {
  res.locals.ua = req.get('User-Agent');
  next();
};
