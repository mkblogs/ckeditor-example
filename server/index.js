const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
var config = require('./config');


const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// PostgreSQL connection config

const pool = new Pool({
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    description TEXT
  );
`);

const accountsRouter = require('./accounts')(pool);
app.use('/accounts', accountsRouter);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
