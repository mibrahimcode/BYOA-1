let timeLeft;
let timerId;
let isRunning = false;
let currentMode = 'pomodoro';

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const addTimeButton = document.getElementById('add-time');
const modeButtons = document.querySelectorAll('.mode-btn');

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
        isRunning = true;
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                alert('Time is up!');
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

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        modeButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Reset timer with new mode
        const minutes = parseInt(button.dataset.time);
        initializeTimer(minutes);
    });
});

// Initialize with Pomodoro mode
initializeTimer(25); 