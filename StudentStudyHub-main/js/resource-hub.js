const currentUser = localStorage.getItem('studyhub_user');
if (!currentUser) window.location.href = 'login.html';

const resources = JSON.parse(localStorage.getItem('studyResources') || '[]');

function renderResources() {
    const container = document.getElementById('resourcesContainer');

    if (resources.length === 0) {
        container.innerHTML = '<p class="empty-state">No resources yet. Be the first to share! 💙</p>';
        return;
    }

    container.innerHTML = resources.map(r => `
        <div class="resource-card">
            <div class="resource-icon">📄</div>
            <div class="resource-info">
                <h4>${escapeHtml(r.title)}</h4>
                <p>Uploaded by: ${escapeHtml(r.author)}</p>
                <small>${r.date}</small>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('uploadBtn')?.addEventListener('click', () => {
    const fileInput = document.getElementById('fileUpload');
    const titleInput = document.getElementById('resourceTitle');

    const title = titleInput.value.trim();
    const file = fileInput.files[0];

    if (!title) {
        alert('Please enter a title / subject.');
        titleInput.focus();
        return;
    }

    if (!file) {
        alert('Please choose a file to upload.');
        fileInput.focus();
        return;
    }

    resources.unshift({
        title,
        author: currentUser,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem('studyResources', JSON.stringify(resources));

    titleInput.value = '';
    fileInput.value = '';

    renderResources();
    alert('Uploaded successfully! ✨');
});

document.getElementById('logoutLink')?.addEventListener('click', () => {
    localStorage.removeItem('studyhub_user');
    window.location.href = 'login.html';
});

renderResources();