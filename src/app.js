require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./middleware/logger')
const imageRouter = require('./routers/image.route')
const commentRouter = require('./routers/comment.router')


// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174']
}));
app.use(express.json());
app.use(logger);

app.use("/api/v1/image", imageRouter);
app.use("/api/v1/comment", commentRouter);
// playGround



app.get('/', (req, res) => {
    res.send('Pic Seek AI server running......!')
})

module.exports = app;