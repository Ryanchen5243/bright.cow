require('dotenv').config();
const { Client } = require('pg');
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });

async function main() {
  let password = '';
  const sm = new AWS.SecretsManager();
  const sec = await sm.getSecretValue({ SecretId: process.env.DB_SECRET_ARN }).promise();
  password = JSON.parse(sec.SecretString).password;

  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password,
    ssl: { rejectUnauthorized: false, ca: require('fs').readFileSync('./global-bundle.pem').toString() }
  });

  try {
    await client.connect();
    const res = await client.query('SELECT version()');
    console.log(res.rows[0].version);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    await client.end();
  }
}
main().catch(console.error);