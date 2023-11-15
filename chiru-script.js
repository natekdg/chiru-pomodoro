let isRunning = false;
let timer;
let timeRemaining = 15 * 60; // 25 minutes

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
        timeRemaining--;
        updateDisplay();
    } else {
        stopTimer();
        alert('Timer is done!');
    }
}

function startTimer()   {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(tick, 1000);
    }
}

function stopTimer()    {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer()   {
    stopTimer();
    timeRemaining = 15 * 60;    // reset timer to 25 minutes
    updateDisplay();
}

updateDisplay();        // update the display at start