let isRunning = false;
let time;
let timeRemaining = 25 * 60; // 25 minutes

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function tick() {
    if (timeRemaining > 0) {
        timeRemaining0--;
        updateDisplay();
    } else {
        stopTimer();
        alert('Timer is done!');
    }
}