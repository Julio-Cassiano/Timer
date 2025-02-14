import Controls from "./controls.js";
import  Timer  from "./timer.js";
import Sound from "./sounds.js"
import {
    buttonPause,
    buttonPlay,
    buttonSet,
    buttonSound,
    buttonSoundOff,
    buttonStop,
    minutesDisplay,
    secondsDisplay } from "./elements.js";


const sound = Sound()

const controls = Controls({buttonPlay,
    buttonPause,
    buttonSet,
    buttonStop,
    buttonPlay
});

const timer = Timer({
    minutesDisplay,
    secondsDisplay,
    reset: controls.reset,
});

buttonPlay.addEventListener('click', function(){
    controls.play();
    timer.countdown();
    sound.pressButton();
});

buttonPause.addEventListener('click', function (){
    controls.pause();
    timer.hold();
    sound.pressButton();
});

buttonSet.addEventListener('click', function (){
    let newMinutes = controls.getMinutes();

    if (!newMinutes) {
        timer.resetTimer();
        return;
    };

    timer.updateDisplay(newMinutes, 0);
    timer.updateMinutes(newMinutes);
});

buttonStop.addEventListener('click', function (){
    controls.reset(); 
    timer.resetTimer();
    sound.pressButton();
});

buttonSound.addEventListener('click', function (){
    buttonSound.classList.add('hide');
    buttonSoundOff.classList.remove('hide');
    sound.bgAudio.pause();
});

buttonSoundOff.addEventListener('click', function (){
    buttonSound.classList.remove('hide');
    buttonSoundOff.classList.add('hide');
    sound.bgAudio.play();
});