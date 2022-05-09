const Todo = require('../models/todo');
const { getHttpResponseContent } = require('../services/response');
const {
  appError,
  validationError,
  asyncHandleError,
} = require('../services/error');
const { isValidObjectId } = require('../services/auth');

const post = {
  // 取得代辦列表
  getTodos: asyncHandleError(async (req, res) => {
    const { user } = req;
    const posts = await Todo.find({ user: user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(getHttpResponseContent(posts));
  }),
  // 新增代辦事項
  postTodo: asyncHandleError(async (req, res, next) => {
    const {
      user,
      body: { todo },
    } = req;
    if (!todo) return next(appError(400, '請填寫代辦內容'));

    const { content } = todo;
    if (!content)
      return next(validationError(400, 'content', '請填寫代辦內容'));

    const createdTodo = await Todo.create({ content, user: user._id });
    const currentTodo = await Todo.findById(createdTodo._id);
    res.status(201).json(getHttpResponseContent(currentTodo));
  }),
  // 修改代辦事項
  putTodo: asyncHandleError(async (req, res, next) => {
    const {
      params: { todo_id },
      body: { todo },
    } = req;
    if (!todo_id) return next(appError(400, '請傳入代辦事項編號'));
    if (!todo) return next(appError(400, '請填寫代辦內容'));

    const { content } = todo;
    if (!content)
      return next(validationError(400, 'content', '請填寫代辦內容'));

    if (!isValidObjectId(todo_id))
      return next(appError(400, '請傳入正確的代辦事項編號'));

    const existTodo = await Todo.findById(todo_id);
    if (!existTodo) return next(appError(400, '查無代辦事項'));

    await Todo.findByIdAndUpdate(todo_id, { content });
    const currentTodo = await Todo.findById(todo_id);
    res.status(201).json(getHttpResponseContent(currentTodo));
  }),
  // 刪除代辦事項
  deleteTodo: asyncHandleError(async (req, res, next) => {
    const {
      params: { todo_id },
    } = req;
    if (!todo_id) return next(appError(400, '請傳入代辦事項編號'));
    if (!isValidObjectId(todo_id))
      return next(appError(400, '請傳入正確的代辦事項編號'));

    const existTodo = await Todo.findById(todo_id);
    if (!existTodo) return next(appError(400, '查無代辦事項'));

    await Todo.findByIdAndDelete(todo_id);
    res.status(201).json(getHttpResponseContent('刪除成功'));
  }),
  // 切換未完成 / 已完成狀態
  patchTodo: asyncHandleError(async (req, res, next) => {
    const {
      params: { todo_id },
    } = req;
    if (!todo_id) return next(appError(400, '請傳入代辦事項編號'));
    if (!isValidObjectId(todo_id))
      return next(appError(400, '請傳入正確的代辦事項編號'));

    const existTodo = await Todo.findById(todo_id);
    if (!existTodo) return next(appError(400, '查無代辦事項'));

    await Todo.findByIdAndUpdate(todo_id, {
      completed_at: existTodo.completed_at ? null : new Date().toJSON(),
    });
    const currentTodo = await Todo.findById(todo_id);
    res.status(201).json(getHttpResponseContent(currentTodo));
  }),
};

module.exports = post;
