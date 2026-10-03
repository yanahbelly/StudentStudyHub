document.addEventListener('DOMContentLoaded', function() {
    // ========== LOGOUT ==========
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            localStorage.removeItem('studyhub_user');
            window.location.href = 'login.html';
        });
    }

    // ========== LOGIN ==========
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const errorBox = document.getElementById('errorBox');

            if (!username || !password) {
                errorBox.textContent = '⚠️ Please fill in all fields';
                return;
            }

            const stored = localStorage.getItem('studyhub_users');
            const users = stored ? JSON.parse(stored) : {};

            if (users[username] && users[username] === password) {
                localStorage.setItem('studyhub_user', username);
                window.location.href = 'index.html'; // ✅ Login → Home
            } else {
                errorBox.textContent = '⚠️ Invalid username or password';
            }
        });
    }

    // ========== PASSWORD TOGGLE ==========
    function setupPasswordToggle(btnId, inputId) {
        const btn = document.getElementById(btnId);
        const input = document.getElementById(inputId);
        if (!btn || !input) return;
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            btn.textContent = isHidden ? '🙈' : '👁️';
        });
    }

    setupPasswordToggle('toggleLoginPass', 'password');
    setupPasswordToggle('toggleSignupPass', 'newPassword');
    setupPasswordToggle('toggleConfirmPass', 'confirmPassword');
});