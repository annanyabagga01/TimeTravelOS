const body = document.body;
const currentYearElement = document.getElementById('currentYear');
const timelineDot = document.getElementById('timelineDot');
const timelineProgress = document.getElementById('timelineProgress');

// Sound Effects Setup (Web Audio API)
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSound(era) {
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    switch (era) {
        case '1990': // Mechanical click
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(100, now);
            oscillator.frequency.exponentialRampToValueAtTime(0.01, now + 0.1);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
        case '2000': // Soft plop
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, now);
            oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.1);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
        case '2025': // Crisp pop
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.05);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            oscillator.start(now);
            oscillator.stop(now + 0.05);
            break;
        case '2050': // Futuristic hum/sweep
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.3);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.15);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
            break;
    }
}

// Initialize audio context on first interaction
document.addEventListener('click', initAudio, { once: true });

// Toast Notification System
const toastContainer = document.getElementById('toastContainer');

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 600); // Wait for transition to finish
    }, 3000);
}

// Button click sounds and actions
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        initAudio();
        const currentEra = Array.from(body.classList)
            .find(c => c.startsWith('era-'))?.split('-')[1] || '1990';
        playSound(currentEra);

        // Specific actions
        if (btn.classList.contains('start-btn')) {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            
            if (currentEra === '2025') {
                window.scrollTo({ top: maxScroll * 0.85, behavior: 'smooth' });
                showToast('Jumping to the Future: 2050', 'success');
            } else if (currentEra === '2050') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showToast('Resetting Timeline: 1995', 'warning');
            } else if (currentEra === '1990') {
                window.scrollTo({ top: maxScroll * 0.35, behavior: 'smooth' });
                showToast('Advancing Timeline: 2005', 'success');
            } else {
                window.scrollBy({ top: window.innerHeight * 0.5, left: 0, behavior: 'smooth' });
                showToast(`System Boot Sequence Initiated in ${currentYearElement.textContent}`, 'success');
            }
        } else if (btn.id === 'actionBtn') {
            const actions = {
                '1990': 'Executing MS-DOS command... C:\\>DIR',
                '2000': 'Downloading toolbar... 99% complete',
                '2025': 'Deploying microservices to the cloud...',
                '2050': 'Quantum entanglement synced successfully.'
            };
            showToast(actions[currentEra], 'action');
        } else if (btn.classList.contains('secondary-btn')) {
            const archives = {
                '1990': 'Accessing Floppy Disk A:',
                '2000': 'Opening My Documents / Limewire',
                '2025': 'Fetching IPFS distributed ledger...',
                '2050': 'Reading neural neural-net archives...'
            };
            showToast(archives[currentEra], 'info');
        }
    });
});

let currentEra = '1990';

// Scroll Tracking
function updateScroll() {
    const scrollY = window.scrollY;
    // Calculate max scroll depth
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Ensure we don't divide by zero if layout is broken
    if (maxScroll <= 0) return;

    const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));

    // Update Timeline UI
    timelineProgress.style.height = `${scrollPercent * 100}%`;
    timelineDot.style.top = `${scrollPercent * 100}%`;

    let newEra = '1990';
    let yearText = '1995';

    // Breakpoints
    if (scrollPercent < 0.25) {
        newEra = '1990';
        yearText = '1995';
    } else if (scrollPercent < 0.50) {
        newEra = '2000';
        yearText = '2005';
    } else if (scrollPercent < 0.75) {
        newEra = '2025';
        yearText = '2025';
    } else {
        newEra = '2050';
        yearText = '2050';
    }

    // Apply Changes if Era changed
    if (newEra !== currentEra) {
        body.className = `era-${newEra}`;
        currentYearElement.textContent = yearText;
        currentEra = newEra;

        // Optional: play sound on era change if audio is initialized
        if (audioCtx && audioCtx.state === 'running') {
            playSound(newEra);
        }
    }
}

// Listen to scroll events
window.addEventListener('scroll', () => {
    requestAnimationFrame(updateScroll);
});

// Initial call to set correct state on load
updateScroll();
