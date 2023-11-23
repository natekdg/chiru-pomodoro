let isRunning = false;
let timer;
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

// tick function to check if timer is greater or less than 0
function tick() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateDisplay();
    } else {
        stopTimer();
        alert('Timer is done!');
    }
}


// function to start the timer
function startTimer()   {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(tick, 1000);
    }
}

// function to stop the timer
function stopTimer()    {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

// function to reset timer
function resetTimer()   {
    stopTimer();
    timeRemaining = 25 * 60;    // reset timer to 25 minutes
    updateDisplay();
}

updateDisplay();        // update the display at start

// ask user to allow/denie notifications for chiru pomodoro
document.addEventListener('DOMContentLoaded', (event) => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied"){
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notifications for Chiru have been allowed.");
            } else {
                console.log("Notifications for Chiru have been denied.")
            }
        })
    }
})

const settingsButton = document.getElementById('settings');

// add click funtion for when settings is clicked
settingsButton.addEventListener('click', function() {
    const timeOptions = document.getElementById('time-options');
    timeOptions.style.display = timeOptions.style.display === 'none' ? 'block' : 'none';
});

// when settings icon is clicked, execute the dropdown menu
window.onclick = function(event) {
    if (!event.target.matches('#time') && !event.target.matches('#settings') && !event.target.closest('#settings')) {
        var dropdowns = document.getElementsByClassName("time-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
};


// update timer when a time option is selected
document.querySelectorAll('.time-option').forEach(item => {
    item.addEventListener('click', function() {
        let time = parseInt(this.getAttribute('data-time'));
        timeRemaining = time * 60;      // convert the minutes to seconds
        updateDisplay();
        document.getElementById('time-options').style.display = 'none';     // hide the dropdown
    });
});

