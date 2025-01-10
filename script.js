let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const toggleButton = document.getElementById('toggle-mode');
const togglePlayButton = document.getElementById('toggle-play');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                updateDisplay();
                alert(isWorkTime ? 'Work Time!' : 'Break Time!');
                togglePlayButton.textContent = 'Start';
            }
        }, 1000);
        togglePlayButton.textContent = 'Pause';
    } else {
        clearInterval(timerId);
        timerId = null;
        togglePlayButton.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    statusText.textContent = 'Work Time';
    updateDisplay();
    togglePlayButton.textContent = 'Start';
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Switch to Rest' : 'Switch to Work';
    updateDisplay();
}

// Initialize
timeLeft = 25 * 60;
updateDisplay();

// Event listeners
togglePlayButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode); 