var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Task Manager API',
        version: '1.0.0',
        description: 'Task Manager API documentation',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./routes/*.js'], // Ajusta la ruta según tu estructura
  };

  const swaggerSpec = swaggerJsdoc(options);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log('Swagger docs available at http://localhost:3000/api-docs');

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
