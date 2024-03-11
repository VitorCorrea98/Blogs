// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  /* Aquele token gerado anteriormente virá na requisição através do
     header Authorization em todas as rotas que queremos que
     sejam autenticadas. */
  const bearerToken = req.header('Authorization');

  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  /* Utilizamos a função para extrair o token */
  const token = extractToken(bearerToken);

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, secret);
    const user = await userService.findUserByEmailToken(decoded.data.email);
    
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};