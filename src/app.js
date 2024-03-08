const express = require('express');
const { userController } = require('./controllers');
const validateJWT = require('./auth/validateJWT');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', userController.validateLogin);
app.post('/user', userController.insert);
app.get('/user', validateJWT, userController.getAll);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
