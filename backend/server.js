// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB-Verbindung herstellen
const MONGODB_URI = 'mongodb+srv://feflermax:f1e2f3l4e5r6@telegramcasino.hwo4khq.mongodb.net/?retryWrites=true&w=majority&appName=TelegramCasino'; // 🔧 Ersetze dies mit deinem Connection String

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB verbunden');
}).catch((err) => {
  console.error('MongoDB-Verbindung fehlgeschlagen', err);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Importiere Modelle
const User = require('./models/User');

// Importiere Routen
const balanceRouter = require('./routes/balance');
const depositRouter = require('./routes/deposit');
const slotRouter = require('./routes/slots');
const usersRouter = require('./routes/users');
const updateBalanceRouter = require('./routes/updateBalance');
const referralRouter = require('./routes/referral');



// Registriere Routen
app.use('/api/balance', balanceRouter);
app.use('/api/deposit', depositRouter);
app.use('/api/slots', slotRouter);
app.use('/api/users', usersRouter);
app.use('/api/update-balance', updateBalanceRouter);
app.use('/api/referral', referralRouter);


// Route zum Abrufen aller Benutzer
app.get('/api/balance', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Beispiel-Route für Testzwecke
app.get('/', (req, res) => {
  res.send('Backend ist online!');
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});