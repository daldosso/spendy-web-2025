const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Expense = require('./models/Expense');

const app = express();
const PORT = 3000;

app.use(cors());

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

app.post('/api/expenses', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Errore nel salvare la spesa', details: err.message });
  }
});

// API per modificare una spesa
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) {
      return res.status(404).json({ error: 'Spesa non trovata' });
    }
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Errore nella modifica della spesa', details: err.message });
  }
});

// API per cancellare una spesa
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Spesa non trovata' });
    }
    res.json({ message: 'Spesa eliminata con successo' });
  } catch (err) {
    res.status(400).json({ error: 'Errore nella cancellazione della spesa', details: err.message });
  }
});

