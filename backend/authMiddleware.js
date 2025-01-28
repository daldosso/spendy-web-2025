const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_jwt_secret_TEST'; // La stessa chiave usata per generare i token

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token non fornito' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
    req.user = decoded; // Aggiungi i dati decodificati al req per usarli in seguito
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token non valido', details: err.message });
  }
};
