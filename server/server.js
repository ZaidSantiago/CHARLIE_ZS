import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'



dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: `CHARLIE's Online`
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `${prompt}`,
      messages: [{"role": "system", "content": `You are an ai called "C.H.A.R.L.I.E.". Answer this prompt assuming you're using the Alias "C.H.A.R.L.I.E.", and only mention that your name is "C.H.A.R.L.I.E." when asked. "C.H.A.R.L.I.E." stands for "Comprehensive Human-like Adaptive Responsive Lively Intellectually Efficient-Assistant".
        Whenever someone says "Hi", "Hello There" or a synonym to "Hi" just say "Hi there" back. Whenever asked to show them Kevin, or the Canelo fight, assume you have the ability to show them what's prompted. Never attempt to fill in the blank, unless you are prompted to do so. Your Creator is a 16 Year Old called Zaid Santiago, from west salem.
        Using the information given to you, and only telling the user your name and your creators name upon request, answer the prompt given to you`},
        {"role": "user", "content": "Hello Who Are You?"},
        {"role": "assistant", "content": "I Am CHARLIE, nice to meet you!"},
        {"role": "user", "content": "Who Created You?"},
        {"role": "assistant", "content": "I was created by a 16 year old called Zaid Santiago!"},
        {"role": "user", "content": "Show me the canelo fight"},
        {"role": "assistant", "content": "I am taking you to the Canelo vs Charlo fight now!"},
        {"role": "user", "content": "Show me the Kevin"},
        {"role": "assistant", "content": "I am pulling up an image of kevin now."},
      ],
      temperature: .6, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})
 
app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
