let isRunning = false;
let timer;
let timeRemaining = 25 * 60; // 25 minutes

const timeDisplay = document.getElementById('time');        // set the label "time" to "timeDisplay"
const startButton = document.getElementById('start');       // set the label "start" to "startButton"
const stopButton = document.getElementById('stop');     // set the label "stop" to "stopButton"
const resetButton = document.getElementById('reset');       // set the label "reset" to "resetButton"
const settingsButton = document.getElementById('settings');     // set the label "settings" to "settingsButton"

startButton.addEventListener('click', startTimer);      // wait/listen for click on "startButton" icon from user and when clicked will start timer
stopButton.addEventListener('click', stopTimer);        // wait/listen for click on "stopButton" icon from user and when clicked will stop timer
resetButton.addEventListener('click', resetTimer);      // wait/lsiten for click on "resetButton" icon from user and when clicked will reset timer


// update to show current time to user
function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// tick function to check if timer is greater or less than 0
function tick() {
    if (timeRemaining > 0) {        // if the time is greater than 0 update the timer
        timeRemaining--;
        updateDisplay();
    } else {
        document.getElementById('timer-end-sound').play();
        stopTimer();        // if timer is = 0, stop and display notification
        alert('Good work!');
        timeDisplay.textContent = "Good Work :)";
    }
}



// when clicked function to start the timer
function startTimer()   {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(tick, 1000);
    }
}

// when cicked function to stop the timer
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



