const { asyncHandleError } = require('../services/error');

const test = {
  // 登入權限測試
  check: asyncHandleError(async (req, res, next) => {
    res.status(200).json({ message: 'OK!' });
  }),
};

module.exports = test;
