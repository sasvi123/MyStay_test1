const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const listings = await db.query('SELECT * FROM listings');
  res.json(listings.rows);
});

router.post('/', async (req, res) => {
  const { title, price, area } = req.body;
  const listing = await db.query(
    'INSERT INTO listings (title, price, area) VALUES ($1,$2,$3) RETURNING *',
    [title, price, area]
  );
  res.json(listing.rows[0]);
});

module.exports = router;
