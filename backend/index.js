const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');
const OpenAI = require('openai');

const Expense = require('./models/Expense');
const User = require('./models/User');

const app = express();

require('dotenv').config();

const PORT = 3000;
const openaiApiKey = process.env.OPENAI_API_KEY;

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
    .then(() => console.log('Connesso a MongoDB'))
    .catch(err => console.error('Errore di connessione a MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Server avviato su PORT: ${PORT}`);
});

app.get('/api/expenses', authMiddleware, async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: 'Errore nel recuperare le spese' });
    }
  });

app.post('/api/expenses', authMiddleware, async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Errore nel salvare la spesa', details: err.message });
  }
});

// API per modificare una spesa
app.put('/api/expenses/:id', authMiddleware, async (req, res) => {
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
app.delete('/api/expenses/:id', authMiddleware, async (req, res) => {
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

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username già in uso' });
    }

    // Cripta la password e salva il nuovo utente
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registrazione completata con successo' });
  } catch (err) {
    res.status(500).json({ error: 'Errore durante la registrazione', details: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Errore durante il login', details: err.message });
  }
});

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

app.post('/api/chat', async (req, res) => {
  try {
      const { message } = req.body;

      if (!message) {
          return res.status(400).json({ error: 'Messaggio obbligatorio' });
      }

      const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{ role: "user", content: message }],
          max_tokens: 150,
      });

      res.json({ reply: response.choices[0].message.content });
  } catch (error) {
      console.error("Errore API ChatGPT:", error);
      res.status(500).json({ error: "Errore nella comunicazione con ChatGPT" });
  }
});