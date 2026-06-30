// Documents Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }
    
    loadDocuments();
});

function handleUpload(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    
    if (files.length === 0) {
        alert('Please select files to upload');
        return;
    }
    
    // In a real application, this would send files to a server
    console.log('Uploading files:', files);
    
    // Show success message
    alert(`${files.length} file(s) uploaded successfully`);
    fileInput.value = '';
    loadDocuments();
}

function loadDocuments() {
    // In a real application, this would fetch documents from an API
    const documentList = document.querySelector('.document-list');
    
    // Sample data
    const documents = [];
    
    if (documents.length === 0) {
        documentList.innerHTML = '<div class="empty-state">No documents uploaded yet.</div>';
        return;
    }
    
    documentList.innerHTML = documents.map(doc => `
        <div class="document-item">
            <h4>${doc.name}</h4>
            <p>Uploaded: ${doc.date}</p>
            <a href="#" class="btn btn-link">Download</a>
        </div>
    `).join('');
}