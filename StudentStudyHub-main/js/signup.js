const signupForm = document.getElementById('signupForm');
const signupError = document.getElementById('signupError');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation(); // Block ALL other handlers
    
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (!username || !password || !confirmPassword) {
        signupError.textContent = '⚠️ Please fill in all fields';
        return false;
    }
    if (username.length < 3) {
        signupError.textContent = '⚠️ Username must be at least 3 characters';
        return false;
    }
    if (password.length < 4) {
        signupError.textContent = '⚠️ Password must be at least 4 characters';
        return false;
    }
    if (password !== confirmPassword) {
        signupError.textContent = '⚠️ Passwords do not match';
        return false;
    }

    // Save account
    let existingUsers = {};
    const stored = localStorage.getItem('studyhub_users');
    if (stored) existingUsers = JSON.parse(stored);

    if (existingUsers[username]) {
        signupError.textContent = '⚠️ Username already taken — choose another';
        return false;
    }

    existingUsers[username] = password;
    localStorage.setItem('studyhub_users', JSON.stringify(existingUsers));

    // CLEAR session — ensure NOT logged in yet
    localStorage.removeItem('studyhub_user');

    // ===== TRIPLE REDIRECT — NOTHING CAN STOP THIS =====
    function goToLogin() {
        window.location.href = 'login.html';
    }
    
    alert('✅ Account created! Going to Sign In...');
    
    // Method 1 — Instant
    goToLogin();
    
    // Method 2 — Backup
    setTimeout(goToLogin, 50);
    
    // Method 3 — Force replace
    setTimeout(function() {
        window.location.replace('login.html');
    }, 100);

    return false; // Absolutely stop default form behavior
});