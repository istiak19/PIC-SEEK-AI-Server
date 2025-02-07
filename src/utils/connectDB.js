require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const imageCollection = client.db('picSeek').collection('image');

async function connectDB() {
    return client.connect();
}

module.exports = { connectDB, imageCollection };