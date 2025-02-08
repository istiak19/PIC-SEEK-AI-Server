const generateAiReply = require("../utils/ai/generateAiReply");
const { commentCollection } = require("../utils/connectDB");


const getSingleUserComment = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { imageId: id }
        const result = await commentCollection.findOne(query);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
const getUserComment = async (req, res) => {
    try {
        const result = await commentCollection.find().toArray();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
const postUserComment = async (req, res) => {
    try {
        const { imageId, prompt, email, comment } = req.body;

        if (!imageId || !prompt || !email || !comment) {
            return res.status(400).json({ message: "Please provide imageId, prompt, email, and comment." });
        }

        const reply = await generateAiReply(prompt, comment);

        const document = {
            prompt,
            imageId,
            email,
            comment,
            createdAt: new Date().toISOString(),
            reply,
        };

        const result = await commentCollection.insertOne(document);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { postUserComment, getUserComment, getSingleUserComment };