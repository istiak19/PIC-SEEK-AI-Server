const getBuffer = require("../utils/ai/getImageBuffer");
const imageGenerateURL = require("../utils/ai/imageGenerateURL");
const { imageCollection } = require("../utils/connectDB");

const insertAiImage = async (req, res) => {
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
};

module.exports = insertAiImage;