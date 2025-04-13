let timeLeft;
let timerId;
let isRunning = false;
let currentMode = 'pomodoro';
let currentFocus = '';

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const addTimeButton = document.getElementById('add-time');
const modeButtons = document.querySelectorAll('.mode-btn');
const focusModal = document.getElementById('focus-modal');
const focusInput = document.getElementById('focus-input');
const setFocusButton = document.getElementById('set-focus');
const currentFocusDisplay = document.getElementById('current-focus');

// Show focus input modal
function showFocusModal() {
    focusModal.style.display = 'flex';
    focusInput.focus();
}

// Hide focus input modal
function hideFocusModal() {
    focusModal.style.display = 'none';
    focusInput.value = '';
}

// Set focus and update display
function setFocus() {
    const focusText = focusInput.value.trim();
    if (focusText) {
        currentFocus = focusText;
        currentFocusDisplay.textContent = `Focus: ${currentFocus}`;
        currentFocusDisplay.classList.add('show');
        hideFocusModal();
    }
}

// Initialize timer with Pomodoro mode (25 minutes)
function initializeTimer(minutes) {
    timeLeft = minutes * 60;
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeDisplay.textContent = timeString;
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (!isRunning) {
        if (currentMode === 'pomodoro' && !currentFocus) {
            showFocusModal();
            return;
        }
        isRunning = true;
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                alert('Time is up!');
                if (currentMode === 'pomodoro') {
                    currentFocus = '';
                    currentFocusDisplay.classList.remove('show');
                }
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
    }
}

function resetTimer() {
    pauseTimer();
    const activeMode = document.querySelector('.mode-btn.active');
    const minutes = parseInt(activeMode.dataset.time);
    initializeTimer(minutes);
}

function addFiveMinutes() {
    if (isRunning) {
        timeLeft += 5 * 60; // Add 5 minutes in seconds
        updateDisplay();
    }
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
addTimeButton.addEventListener('click', addFiveMinutes);
setFocusButton.addEventListener('click', setFocus);

// Handle Enter key in focus input
focusInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setFocus();
    }
});

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        modeButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Reset timer with new mode
        const minutes = parseInt(button.dataset.time);
        initializeTimer(minutes);
        
        // Update current mode
        currentMode = button.textContent.toLowerCase().includes('break') ? 'break' : 'pomodoro';
        
        // Clear focus when switching to break mode
        if (currentMode === 'break') {
            currentFocus = '';
            currentFocusDisplay.classList.remove('show');
        }
    });
});

// Initialize with Pomodoro mode
initializeTimer(25); 