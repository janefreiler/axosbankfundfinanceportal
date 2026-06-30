// Messages/Real-time Communication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', handleSendMessage);
    }
    
    loadMessages();
});

function handleSendMessage(e) {
    e.preventDefault();
    
    const messageInput = document.getElementById('messageText');
    const message = messageInput.value;
    
    if (!message.trim()) {
        alert('Please enter a message');
        return;
    }
    
    // In a real application, this would send the message to a server/WebSocket
    console.log('Sending message:', message);
    
    messageInput.value = '';
    loadMessages();
}

function loadMessages() {
    // In a real application, this would fetch messages from an API
    const messageList = document.querySelector('.message-list');
    
    // Sample data
    const messages = [];
    
    if (messages.length === 0) {
        messageList.innerHTML = '<div class="empty-state">No messages yet. Start a conversation with an underwriter.</div>';
        return;
    }
    
    messageList.innerHTML = messages.map(msg => `
        <div class="message-item ${msg.sender === 'user' ? 'sent' : 'received'}">
            <p>${msg.text}</p>
            <time>${msg.timestamp}</time>
        </div>
    `).join('');
}