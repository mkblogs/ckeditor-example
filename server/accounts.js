const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // GET all accounts
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM accounts ORDER BY id DESC');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET single account by id
  router.get('/:id', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM accounts WHERE id = $1', [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Account not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create account
  router.post('/', async (req, res) => {
    const { name, type, address, description } = req.body;
    if (!name || !type || !address) {
      return res.status(400).json({ error: 'Name, type, and address are required.' });
    }
    try {
      const result = await pool.query(
        'INSERT INTO accounts (name, type, address, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, type, address, description]
      );
      const created = result.rows[0];
      res.status(201)
        .location(`/accounts/${created.id}`)
        .json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT update account
  router.put('/:id', async (req, res) => {
    const { name, type, address, description } = req.body;
    try {
      const result = await pool.query(
        'UPDATE accounts SET name=$1, type=$2, address=$3, description=$4 WHERE id=$5 RETURNING *',
        [name, type, address, description, req.params.id]
      );
      if (result.rowCount === 0) return res.status(404).json({ error: 'Account not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE account
  router.delete('/:id', async (req, res) => {
    try {
      const result = await pool.query('DELETE FROM accounts WHERE id = $1 RETURNING *', [req.params.id]);
      if (result.rowCount === 0) return res.status(404).json({ error: 'Account not found' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}; 