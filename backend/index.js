const express = require('express');
const mongoose = require('mongoose');

const Expense = require('./models/Expense');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/spendy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connesso a MongoDB'))
    .catch(err => console.error('Errore di connessione a MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});

app.get('/api/expenses', async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: 'Errore nel recuperare le spese' });
    }
  });