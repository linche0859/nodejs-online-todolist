const validator = require('validator');
const User = require('../models/user');
const { getHttpResponseContent } = require('../services/response');
const {
  appError,
  validationError,
  asyncHandleError,
} = require('../services/error');
const {
  getEncryptedPassword,
  getJWT,
  isValidPassword,
} = require('../services/auth');

const user = {
  // 註冊帳號
  signUp: asyncHandleError(async (req, res, next) => {
    const {
      body: { user },
    } = req;
    if (!user) return next(appError(422, '註冊發生錯誤'));

    const { nickname, email, password } = user;

    if (!(nickname && email && password))
      return next(appError(422, '請填寫註冊資訊'));
    if (!validator.isLength(nickname, { min: 2 }))
      return next(validationError(422, 'nickname', '暱稱至少 2 個字元以上'));
    if (!validator.isEmail(email))
      return next(validationError(422, 'email', '電子信箱格式有誤'));
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 0,
        minSymbols: 0,
      })
    )
      return next(
        validationError(422, 'password', '密碼需至少 8 碼以上，並英數混合')
      );

    const exist = await User.findOne({ email });
    if (exist)
      return next(
        validationError(422, 'email', '帳號已被註冊，請替換新的 Email！')
      );

    const hash = await getEncryptedPassword(password);
    const newUser = await User.create({ email, nickname, password: hash });

    res.status(201).json(getHttpResponseContent({ token: getJWT(newUser) }));
  }),
  // 登入會員
  signIn: asyncHandleError(async (req, res, next) => {
    const {
      body: { user },
    } = req;
    if (!user) return next(appError(401, '您需要先登入或註冊後才能繼續。'));

    const { email, password } = user;
    if (!(email && password))
      return next(appError(401, '電子信箱或密碼錯誤。'));
    const currentUser = await User.findOne({ email }).select('+password');
    if (!currentUser) return next(appError(401, '您尚未註冊會員'));

    const isValid = await isValidPassword(password, currentUser.password);
    if (!isValid) return next(appError(401, '電子信箱或密碼錯誤。'));

    res
      .status(201)
      .json(getHttpResponseContent({ token: getJWT(currentUser) }));
  }),
  // 取得帳號資訊
  me: asyncHandleError(async (req, res, next) => {
    res.status(200).json(getHttpResponseContent(req.user));
  }),
};

module.exports = user;
