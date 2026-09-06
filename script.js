// ===== MOBILE NAV TOGGLE =====
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ===== ACTIVE NAV LINK ON CLICK =====
const navLinkItems = document.querySelectorAll('.nav-link');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navLinks.classList.remove('active'); // Close mobile menu
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NOTES SYSTEM — SAVE TO LOCAL STORAGE =====
const noteInput = document.getElementById('note-input');
const saveNoteBtn = document.getElementById('save-note');
const notesDisplay = document.getElementById('notes-display');

// Load saved notes on page open
let notes = JSON.parse(localStorage.getItem('studentStudyHubNotes')) || [];

// Render notes to page
function renderNotes() {
    notesDisplay.innerHTML = '';
    if (notes.length === 0) {
        notesDisplay.innerHTML = '<li style="color:#64748b; background:transparent;">No notes yet. Write your first note above!</li>';
        return;
    }
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${note.text} <small style="color:#94a3b8; font-size:0.8rem;">(${note.date})</small></span>
            <button class="delete-note" data-index="${index}">×</button>
        `;
        notesDisplay.appendChild(li);
    });

    // Add delete listeners
    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });
    });
}

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem('studentStudyHubNotes', JSON.stringify(notes));
}

// Save note button click
saveNoteBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (!text) {
        alert('Please write a note first!');
        return;
    }
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
    notes.unshift({ text, date: today });
    saveNotes();
    renderNotes();
    noteInput.value = '';
});

// Initialize notes on page load
renderNotes();

// ===== SCROLL EFFECT FOR NAVBAR =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

console.log('📚 StudentStudyHub loaded successfully!');