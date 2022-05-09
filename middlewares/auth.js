const User = require('../models/user');
const { appError, asyncHandleError } = require('../services/error');
const { getDecryptedJWT } = require('../services/auth');

const auth = asyncHandleError(async (req, res, next) => {
  const {
    headers: { authorization = '' },
  } = req;
  let token = '';
  if (authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return next(appError(401, '未授權'));
  }
  const decryptedData = getDecryptedJWT(token);
  if (!decryptedData) return next(appError(401, '未授權'));

  const user = await User.findById(decryptedData.id);
  req.user = user;
  next();
});

module.exports = auth;
