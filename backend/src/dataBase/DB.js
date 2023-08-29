const { MongoClient } = require('mongodb');

const uri = 'mongodb://root:root@localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

function getClient() {
  return client;
}

module.exports = { connect, getClient };