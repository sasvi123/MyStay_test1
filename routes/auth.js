const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const user = await db.query(
    'INSERT INTO users (email, password, role) VALUES ($1,$2,$3) RETURNING *',
    [email, hash, role]
  );

  res.json(user.rows[0]);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);

  if (!result.rows.length) return res.status(400).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, result.rows[0].password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign(
    { id: result.rows[0].id, role: result.rows[0].role },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;
