const { ObjectId } = require("mongodb");
const getBuffer = require("../utils/ai/getImageBuffer");
const imageGenerateURL = require("../utils/ai/imageGenerateURL");
const { imageCollection } = require("../utils/connectDB");

const insertAiImage = async (req, res) => {
    try {
        const { email, prompt, userName, userImg, category } = req.body;
        if (!email || !prompt || !userName || !userImg || !category) {
            res.status(400).send({ message: 'Please Provide email, prompt, userName, userImg, category' });
            return;
        }
        //    create final prompt and image generate
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
        res.status(500).send(err)
    }
};

const getAiImage = async (req, res) => {
    try {
        const result = await imageCollection.find().project({
            _id: 1, userName: 1, imageUrl: 1, userImg: 1
        }).toArray();
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
const getSingleImage = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = {
            projection: { _id: 1, userName: 1, imageUrl: 1, userImg: 1 }
        };
        
        const result = await imageCollection.findOne(query, options);
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

module.exports = { insertAiImage, getAiImage, getSingleImage };