const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({apiKey:"87abc3cbd9msha1f235df0894670p1ef4b3jsnb57fb4ce702a"});
// Use your own API Key. This Key will not work. Create an API key from OPENAI paltform and replace it with above.

const openai= new OpenAIApi(configuration);

export async function sendMsgOpenAI(message){
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature : 0.7,
        max_tokens: 256,
        top_p : 1,
        frequency_penalty: 0,
        presense_penalty: 0

    });

    return res.data.choices[0].text;
}