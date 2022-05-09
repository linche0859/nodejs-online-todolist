const express = require('express');
const router = express.Router();
const TestController = require('../controllers/test');
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res, next) =>
  /**
   * #swagger.tags = ['Tests']
   * #swagger.summary = '登入權限測試'
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
      description: '登入權限測試成功',
      schema: {
        message: 'OK!',
      }
    }
    #swagger.responses[401] = {
      description: '登入權限測試失敗',
      schema: {
        message: '未授權'
      }
    }
  */
  TestController.check(req, res, next)
);

module.exports = router;
