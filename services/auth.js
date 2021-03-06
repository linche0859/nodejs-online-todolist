const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

/**
 * 取得 JSON Web Token
 * @param {object} user 會員資訊
 * @returns {string}
 */
const getJWT = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });

/**
 * 取得解密的 JSON Web Token
 * @param {string} token JSON Web Token
 * @returns {string}
 */
const getDecryptedJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

/**
 * 取得加密後的密碼
 * @param {string} password 原始密碼
 * @returns {string}
 */
const getEncryptedPassword = async (password) => {
  const saltRounds = process.env.SALT_ROUNDS
    ? parseInt(process.env.SALT_ROUNDS)
    : 12;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

/**
 * 驗證密碼是否有效
 * @param {string} password 密碼
 * @param {string} comparedPassword 被比較的密碼
 * @returns {boolean}
 */
const isValidPassword = async (password, comparedPassword) => {
  const valid = await bcrypt.compare(password, comparedPassword);
  return valid;
};

/**
 * Mongoose 的編號是否為有效
 * @param {string} id 編號
 * @returns {boolean}
 */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  getJWT,
  getDecryptedJWT,
  getEncryptedPassword,
  isValidPassword,
  isValidObjectId,
};
