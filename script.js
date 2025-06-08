let messageCount = 0;
const maxFreeMessages = 5;

async function sendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  input.value = '';

  messageCount++;
  if (messageCount > maxFreeMessages) {
    appendMessage('Para continuar conversando com Deus, clique aqui para desbloquear: [LINK DE PAGAMENTO]', 'bot');
    return;
  }

  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });
  const data = await response.json();
  appendMessage(data.reply, 'bot');
}

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = sender + '-message';
  msg.innerText = text;
  document.getElementById('chat-box').appendChild(msg);
}