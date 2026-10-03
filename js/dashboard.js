const currentUser = localStorage.getItem('studyhub_user');
if (!currentUser) window.location.href = 'login.html';

document.getElementById('userName').textContent = currentUser;

let tasks = JSON.parse(localStorage.getItem('userTasks') || '[]');

function saveTasks() {
    localStorage.setItem('userTasks', JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        list.innerHTML = '<li class="empty-state">No tasks yet. Add one above! ✨</li>';
    } else {
        list.innerHTML = tasks.map((t, i) => `
            <li class="task-item ${t.done ? 'done' : ''}">
                <label class="task-checkbox">
                    <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${i})">
                    <span class="checkmark"></span>
                </label>
                <span class="task-text">${escapeHtml(t.text)}</span>
                <button onclick="deleteTask(${i})" class="delete-btn" title="Remove">×</button>
            </li>
        `).join('');
    }
    updateStats();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    if (confirm('Remove this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function updateStats() {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    
    document.getElementById('completedCount').textContent = done;
    document.getElementById('totalCount').textContent = total;
    document.getElementById('progressFill').style.width = `${percent}%`;
    document.getElementById('progressPercent').textContent = `${percent}%`;
}

document.getElementById('addTaskBtn')?.addEventListener('click', addNewTask);
document.getElementById('newTask')?.addEventListener('keypress', e => {
    if (e.key === 'Enter') addNewTask();
});

function addNewTask() {
    const input = document.getElementById('newTask');
    const text = input.value.trim();
    if (!text) {
        input.focus();
        return;
    }
    tasks.unshift({ text, done: false });
    saveTasks();
    renderTasks();
    input.value = '';
}

document.getElementById('logoutLink')?.addEventListener('click', () => {
    localStorage.removeItem('studyhub_user');
    window.location.href = 'login.html';
});

renderTasks();