// Main Application JavaScript
// This file handles static interactions and form handling for the prototype

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  console.log('Axos Bank Fund Finance Portal - Initializing...');
  
  // Initialize event listeners
  setupNavigation();
  setupDocumentUpload();
  setupMessaging();
  setupForms();
  
  console.log('App initialized successfully');
}

// Navigation Setup
function setupNavigation() {
  const navLinks = document.querySelectorAll('nav a, .nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
    });
  });
}

// Document Upload Handling
function setupDocumentUpload() {
  const uploadSection = document.querySelector('.upload-section');
  const fileInput = document.querySelector('input[type="file"]');
  
  if (!uploadSection || !fileInput) return;
  
  // Click to upload
  uploadSection.addEventListener('click', function() {
    fileInput.click();
  });
  
  // Drag and drop
  uploadSection.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadSection.classList.add('dragover');
  });
  
  uploadSection.addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadSection.classList.remove('dragover');
  });
  
  uploadSection.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadSection.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  });
  
  // File input change
  fileInput.addEventListener('change', function() {
    handleFileUpload(this.files);
  });
}

function handleFileUpload(files) {
  if (files.length === 0) return;
  
  for (let file of files) {
    console.log('File selected:', file.name, file.size, file.type);
    
    // Validate file
    if (validateFile(file)) {
      addDocumentToList(file);
      showNotification('success', `${file.name} uploaded successfully`);
    } else {
      showNotification('error', `File ${file.name} is not allowed`);
    }
  }
}

function validateFile(file) {
  // Allowed file types
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  
  // Max file size: 10MB
  const maxSize = 10 * 1024 * 1024;
  
  if (!allowedTypes.includes(file.type)) {
    console.warn('File type not allowed:', file.type);
    return false;
  }
  
  if (file.size > maxSize) {
    console.warn('File size exceeds limit:', file.size);
    return false;
  }
  
  return true;
}

function addDocumentToList(file) {
  const documentList = document.querySelector('.document-list');
  if (!documentList) return;
  
  const fileIcon = getFileIcon(file.type);
  const fileSize = formatFileSize(file.size);
  const uploadDate = new Date().toLocaleDateString();
  
  const documentItem = document.createElement('li');
  documentItem.className = 'document-item';
  documentItem.innerHTML = `
    <div class="document-info">
      <div class="document-icon">${fileIcon}</div>
      <div class="document-details">
        <div class="document-name">${file.name}</div>
        <div class="document-meta">Size: ${fileSize} • Uploaded: ${uploadDate}</div>
      </div>
    </div>
    <div>
      <span class="document-status status-uploaded">Uploaded</span>
      <div class="document-actions">
        <button class="doc-action-btn" onclick="downloadDocument(this)" title="Download">↓</button>
        <button class="doc-action-btn delete" onclick="deleteDocument(this)" title="Delete">✕</button>
      </div>
    </div>
  `;
  
  documentList.appendChild(documentItem);
}

function getFileIcon(fileType) {
  if (fileType.includes('pdf')) return '📄';
  if (fileType.includes('image')) return '🖼️';
  if (fileType.includes('word')) return '📝';
  if (fileType.includes('sheet') || fileType.includes('excel')) return '📊';
  return '📎';
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function downloadDocument(button) {
  showNotification('info', 'Download functionality will be available with backend integration');
}

function deleteDocument(button) {
  if (confirm('Are you sure you want to delete this document?')) {
    const documentItem = button.closest('.document-item');
    documentItem.remove();
    showNotification('success', 'Document deleted');
  }
}

// Messaging Setup
function setupMessaging() {
  const conversationItems = document.querySelectorAll('.conversation-item');
  const messageForm = document.querySelector('.message-form');
  const messageInput = document.querySelector('.message-input');
  
  // Conversation selection
  conversationItems.forEach(item => {
    item.addEventListener('click', function() {
      conversationItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Message submission
  if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      sendMessage();
    });
  }
  
  // Auto-expand textarea
  if (messageInput) {
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
  }
}

function sendMessage() {
  const messageInput = document.querySelector('.message-input');
  const messagesContainer = document.querySelector('.messages-container');
  
  if (!messageInput || !messagesContainer || messageInput.value.trim() === '') return;
  
  const messageText = messageInput.value.trim();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Add sent message
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message sent';
  messageDiv.innerHTML = `
    <div class="message-content">
      <div class="message-bubble">${escapeHtml(messageText)}</div>
      <div class="message-time">${timestamp}</div>
    </div>
    <div class="message-avatar">You</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messageInput.value = '';
  messageInput.style.height = 'auto';
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Simulate received response
  setTimeout(() => {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'message received';
    responseDiv.innerHTML = `
      <div class="message-avatar">UW</div>
      <div class="message-content">
        <div class="message-bubble">Thanks for your message. I'll review it and get back to you soon.</div>
        <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    `;
    
    messagesContainer.appendChild(responseDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1000);
}

// Form Handling
function setupForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Prevent default submission for prototype
      // e.preventDefault();
      
      // Validate form
      if (this.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      this.classList.add('was-validated');
    });
  });
}

// Notification System
function showNotification(type, message) {
  const notificationContainer = document.querySelector('.notification-container') || createNotificationContainer();
  
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = 'var(--spacing-lg)';
  notification.style.right = 'var(--spacing-lg)';
  notification.style.zIndex = '9999';
  notification.style.minWidth = '300px';
  notification.style.animation = 'slideIn 0.3s ease';
  
  notificationContainer.appendChild(notification);
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function createNotificationContainer() {
  const container = document.createElement('div');
  container.className = 'notification-container';
  document.body.appendChild(container);
  return container;
}

// Utility Functions
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Tab Switching
function switchTab(tabName) {
  const tabs = document.querySelectorAll('[data-tab]');
  const buttons = document.querySelectorAll('.category-tab');
  
  tabs.forEach(tab => {
    tab.style.display = tab.getAttribute('data-tab') === tabName ? 'block' : 'none';
  });
  
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('App.js loaded successfully');
