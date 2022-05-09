const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todo');
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) =>
  /**
   * #swagger.tags = ['Todos']
   * #swagger.summary = '取得代辦列表'
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
      description: '成功取得代辦列表',
      schema: {
        $ref: '#/definitions/Todos'
      }
    }
   */
  TodoController.getTodos(req, res)
);
router.post('/', auth, (req, res, next) =>
  /**
   * #swagger.tags = ['Todos']
   * #swagger.summary = '新增代辦事項'
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
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: '代辦事項資料',
      schema: {
        todo: {
          $content: '代辦事項內容',
        }
      }
    }
  */
  /**
    #swagger.responses[201] = {
      description: '新增代辦事項成功',
      schema: { $ref: '#/definitions/Todo' }
    }
    #swagger.responses[400] = {
      description: '新增代辦事項失敗',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  TodoController.postTodo(req, res, next)
);
router.put('/:todo_id', auth, (req, res, next) =>
  /**
   * #swagger.tags = ['Todos']
   * #swagger.summary = '修改代辦事項'
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
    #swagger.parameters['todo_id'] = {
      in: 'param',
      description: '代辦事項編號'
    }
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: '代辦事項資料',
      schema: {
        todo: {
          $content: '代辦事項內容',
        }
      }
    }
  */
  /**
    #swagger.responses[201] = {
      description: '修改代辦事項成功',
      schema: { $ref: '#/definitions/Todo' }
    }
    #swagger.responses[400] = {
      description: '修改代辦事項失敗',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  TodoController.putTodo(req, res, next)
);
router.delete('/:todo_id', auth, (req, res, next) =>
  /**
   * #swagger.tags = ['Todos']
   * #swagger.summary = '刪除代辦事項'
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
    #swagger.parameters['todo_id'] = {
      in: 'param',
      description: '代辦事項編號'
    }
  */
  /**
    #swagger.responses[201] = {
      description: '刪除代辦事項成功',
      schema: { $ref: '#/definitions/Todo' }
    }
    #swagger.responses[400] = {
      description: '刪除代辦事項失敗',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  TodoController.deleteTodo(req, res, next)
);
router.patch('/:todo_id', auth, (req, res, next) =>
  /**
   * #swagger.tags = ['Todos']
   * #swagger.summary = '切換未完成 / 已完成狀態'
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
    #swagger.parameters['todo_id'] = {
      in: 'param',
      description: '代辦事項編號'
    }
  */
  /**
    #swagger.responses[201] = {
      description: '切換成功',
      schema: { $ref: '#/definitions/Todo' }
    }
    #swagger.responses[400] = {
      description: '切換失敗',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  TodoController.patchTodo(req, res, next)
);

module.exports = router;
