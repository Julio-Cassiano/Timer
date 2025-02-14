import Sound from "./sounds.js"

const sound = Sound();

export default function Timer({
    minutesDisplay, 
    secondsDisplay,
    resetControls,
}) {

    let timerTimeout;
    let minutes = Number(minutesDisplay.textContent);

    function updateDisplay(newMinutes, seconds) {
        minutesDisplay.textContent = String(newMinutes).padStart(2, "0");
        secondsDisplay.textContent = String(seconds).padStart(2, "0");
    };

    function countdown() {
        timerTimeout = setTimeout(function () {
            let seconds = Number(secondsDisplay.textContent);
            let minutes = Number(minutesDisplay.textContent);

            updateDisplay(minutes, 0);

            if (minutes == 0 && seconds == 0) {
                resetControls();
                updateDisplay(minutes);
                sound.kitchenTimer.play();
                return;
            };


            if (seconds == 0) {
                seconds = 60;
                --minutes
            };

            updateDisplay(minutes, String(seconds - 1));

            countdown();
        }, 1000)
    }

    function hold() {
        clearTimeout(timerTimeout);
    }

    function resetTimer() {
        updateDisplay(minutes, 0);
        clearTimeout(timerTimeout);
        }

    function updateMinutes(newMinutes) {
        minutes = newMinutes
    }

        return {
            updateDisplay,
            countdown,
            resetTimer,
            updateMinutes,
            hold
        };
}; 