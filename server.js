const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/message', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    });
    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "Não consegui entender. Tente novamente.";
    res.json({ reply: aiMessage });
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ error: 'Erro ao se comunicar com Deus.' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
