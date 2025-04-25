require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ініціалізація Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Перевірка JWT токена
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Базовий маршрут для перевірки роботи сервера
app.get('/', (req, res) => {
  res.send('Сервер платформи оренди спортивного обладнання працює!');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});

// Реєстрація нового користувача
app.post('/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;
      
      // Створення користувача в Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: name
      });
      
      // Створення запису користувача в Firestore
      await db.collection('users').doc(userRecord.uid).set({
        name,
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Генерація JWT токена
      const token = jwt.sign(
        { uid: userRecord.uid, email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Логін користувача
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // У реальному додатку тут буде перевірка через Firebase Auth
      // Для спрощення просто перевіряємо наявність користувача в Firestore
      const snapshot = await db.collection('users')
        .where('email', '==', email)
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        return res.status(401).json({ error: 'Користувача не знайдено' });
      }
      
      const userDoc = snapshot.docs[0];
      const user = userDoc.data();
      
      // Генерація JWT токена
      const token = jwt.sign(
        { uid: userDoc.id, email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Отримання профілю користувача
  app.get('/profile', authenticateJWT, async (req, res) => {
    try {
      const userDoc = await db.collection('users').doc(req.user.uid).get();
      
      if (!userDoc.exists) {
        return res.status(404).json({ error: 'Користувача не знайдено' });
      }
      
      res.json(userDoc.data());
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Отримання оренд користувача (з фільтрацією по ціні)
app.get('/rentals', authenticateJWT, async (req, res) => {
    try {
      const { minPrice, maxPrice } = req.query;
      let query = db.collection('rentals').where('userId', '==', req.user.uid);
      
      if (minPrice) {
        query = query.where('price', '>=', parseFloat(minPrice));
      }
      
      if (maxPrice) {
        query = query.where('price', '<=', parseFloat(maxPrice));
      }
      
      const snapshot = await query.get();
      const rentals = [];
      
      snapshot.forEach(doc => {
        rentals.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      res.json(rentals);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Додавання нової оренди
  app.post('/rentals', authenticateJWT, async (req, res) => {
    try {
      const { equipmentId, name, price, image, startDate, endDate, days } = req.body;
      
      const rentalRef = await db.collection('rentals').add({
        userId: req.user.uid,
        equipmentId,
        name,
        price,
        image,
        startDate,
        endDate,
        days,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      res.status(201).json({ id: rentalRef.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Видалення оренди
  app.delete('/rentals/:id', authenticateJWT, async (req, res) => {
    try {
      const rentalId = req.params.id;
      const rentalRef = db.collection('rentals').doc(rentalId);
      const rentalDoc = await rentalRef.get();
      
      if (!rentalDoc.exists) {
        return res.status(404).json({ error: 'Оренду не знайдено' });
      }
      
      if (rentalDoc.data().userId !== req.user.uid) {
        return res.status(403).json({ error: 'Недостатньо прав' });
      }
      
      await rentalRef.delete();
      res.json({ message: 'Оренду видалено' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });