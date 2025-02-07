const app = require('./src/app');
const { connectDB } = require('./src/utils/connectDB');

require('dotenv').config()
const port = process.env.PORT || 5000

// Server Connect
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Pic Seek AI server running on port ${port}`)
            console.log('Connection to mongodb')
        })
    })
    .catch(err => {
        console.log(err)
    });
