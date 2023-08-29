const db = require('./DataBase/DB.js');

async function run() {
  try {
    await db.connect();

    console.log('Connected to MongoDB');

    const database = db.getClient().db('testdb');
    const collection = database.collection('greetings');

    const message = { message: 'Hello, MongoDB2!' };
    const result = await collection.insertOne(message);

    console.log('Document inserted:', result.insertedId);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await db.getClient().close();
  }
}

run();