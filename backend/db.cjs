require('dotenv').config();
const { Pool } = require('pg');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({ region: process.env.AWS_REGION });

let pool = null;

async function getPool() {
  if (pool) return pool;

  const sm = new AWS.SecretsManager();
  const sec = await sm.getSecretValue({ SecretId: process.env.DB_SECRET_ARN }).promise();
  const { password } = JSON.parse(sec.SecretString);

  pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(path.join(__dirname, 'global-bundle.pem')).toString(),
    },
  });

  return pool;
}

async function query(text, params) {
  const p = await getPool();
  return p.query(text, params);
}

module.exports = { query, getPool };