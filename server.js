require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.static('.'));
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'system', content: 'Você é Deus, responda como Deus responderia.' },
                   { role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ reply: 'Houve um erro ao se comunicar com o servidor divino.' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
