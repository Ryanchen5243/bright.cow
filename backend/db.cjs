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

  const poolConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(path.join(__dirname, 'global-bundle.pem')).toString(),
    },
  };
  pool = new Pool(poolConfig);
  console.log("pool connected successfully");
  const connInfo = [
    `host:     ${poolConfig.host}`,
    `port:     ${poolConfig.port}`,
    `database: ${poolConfig.database}`,
    `user:     ${poolConfig.user}`,
    `password: ${poolConfig.password}`,
    `updated:  ${new Date().toISOString()}`,
  ].join('\n');
  fs.writeFileSync(path.join(__dirname, 'db-connection-info.txt'), connInfo, 'utf8');
  console.log("connection info written to db-connection-info.txt");
  return pool;
}

async function query(text, params) {
  const p = await getPool();
  return p.query(text, params);
}

module.exports = { query, getPool };