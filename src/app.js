require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./middleware/logger')
const getBuffer = require('./utils/ai/getImageBuffer')
const imageGenerateURL = require('./utils/ai/imageGenerateURL')
const { imageCollection } = require('./utils/connectDB')
const imageRouter = require('./routers/mage.route')


// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174']
}));
app.use(express.json());
app.use(logger);

app.use("/api/v1/image", imageRouter);
// playGround



app.get('/', (req, res) => {
    res.send('Pic Seek AI server running......!')
})

module.exports = app;