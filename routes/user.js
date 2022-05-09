const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.get('/me', auth, (req, res, next) =>
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = '取得帳號資訊'
   * #swagger.security = [{
      "apiKeyAuth": [] 
    }]
   */
  /**
    #swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'JSON Web Token',
      schema: {
        $Authorization: '',
      }
    }
   */
  /**
    #swagger.responses[200] = {
      description: '取得帳號資訊成功',
      schema: { $ref: '#/definitions/Users' }
    }
    #swagger.responses[401] = {
      description: '取得帳號資訊失敗',
      schema: {
        message: '未授權'
      }
    }
  */
  UserController.me(req, res, next)
);
router.post('/sign_up', (req, res, next) =>
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = '註冊帳號'
   */
  /**
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: '註冊資料',
      schema: {
        user: {
          $nickname: '暱稱',
          $email: 'test@gmail.com',
          $password: 'a1234567',
        }
      }
    }
   */
  /**
    #swagger.responses[200] = {
      description: '註冊帳號成功',
      schema: {
        token: 'token',
      }
    }
    #swagger.responses[400] = {
      description: '註冊帳號失敗',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  UserController.signUp(req, res, next)
);
router.post('/sign_in', (req, res, next) =>
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = '登入帳號'
   */
  /**
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: '登入資料',
      schema: {
        user: {
          $email: 'test@gmail.com',
          $password: 'a1234567',
        }
      }
    }
   */
  /**
    #swagger.responses[200] = {
      description: '登入帳號成功',
      schema: {
        token: 'token',
      }
    }
    #swagger.responses[400] = {
      description: '登入帳號失敗',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  UserController.signIn(req, res, next)
);

module.exports = router;
