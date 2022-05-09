const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const todoDefinition = {
  _id: '123456789',
  content: '代辦事項內容',
  completed_at: '2022-05-09T00:00:00Z',
};

const doc = {
  info: {
    title: 'METAWALL',
    description: 'METAWALL 的 API 文件',
  },
  host: process.env.SWAGGER_BASE || 'localhost:3000',
  schemes: ['http', 'https'],
  tags: [
    { name: 'Tests', description: '測試相關' },
    { name: 'Users', description: '帳號相關' },
    { name: 'Todos', description: '代辦事項相關' },
  ],
  definitions: {
    Users: {
      _id: '123456789',
      nickname: '帳號暱稱',
    },
    Todos: {
      todos: [todoDefinition],
    },
    Todo: todoDefinition,
    Error: {
      message: {
        field: '錯誤訊息',
      },
    },
  },
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'JSON Web Token',
    },
  },
};

const outputFile = './swagger_output.json'; // 輸出的文件名稱
const endpointsFiles = ['./app.js']; // 要指向的 API

swaggerAutogen(outputFile, endpointsFiles, doc);
