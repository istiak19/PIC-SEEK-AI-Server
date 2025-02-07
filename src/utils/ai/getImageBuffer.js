require('dotenv').config()
const getBuffer = async (prompt, category) => {
    const finalPrompt = `imagine a ${category} : ${prompt}`;
    const myForm = new FormData()
    myForm.append('prompt', finalPrompt);
    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.CD_apiKey,
        },
        body: myForm,
    })
    const buffer = response.arrayBuffer();
    console.log(buffer);
    return buffer;
};

module.exports = getBuffer;