const axios = require('axios');
require('dotenv').config()
const image_key = process.env.IMGBB_apiKey;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`
const imageGenerateURL = async (buffer, prompt) => {
    const formData = new FormData();
    formData.append('image', new Blob([buffer], { type: "image/jpeg" }),
        `${prompt}.jpg`);
    const res = await axios.post(image_api, formData);
    return res.data.data.url;
};

module.exports=imageGenerateURL;