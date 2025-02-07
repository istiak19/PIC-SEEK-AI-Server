require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./middleware/logger')
const getBuffer = require('./utils/ai/getImageBuffer')
const imageGenerateURL = require('./utils/ai/imageGenerateURL')
const { imageCollection } = require('./utils/connectDB')


// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);


// playGround
app.post('/create-image', async (req, res) => {
    const { email, prompt, userName, userImg, category } = req.body;
    if (!email || !prompt || !userName || !userImg || !category) {
        res.status(400).send({ message: 'Please Provide email, prompt, userName, userImg, category' });
        return;
    }
    //    create final prompt and image generate
    try {
        const buffer = await getBuffer(prompt, category)
        const photo = await imageGenerateURL(buffer, prompt);
        // Store in MongoDB as an object
        const imageData = {
            email,
            prompt,
            userName,
            userImg,
            category,
            imageUrl: photo,
            createdAt: new Date()
        };
        const result = await imageCollection.insertOne(imageData);
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})


app.get('/', (req, res) => {
    res.send('Pic Seek AI server running......!')
})

module.exports = app;