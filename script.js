const display = document.getElementById("display");

// Only one sound file
const clickSound = new Audio("Image/click.wav");

function playSound(freq = 500) {

    const audioContext =
        new (window.AudioContext || window.webkitAudioContext)();

    const oscillator =
        audioContext.createOscillator();

    const gainNode =
        audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = freq;

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.2
    );

    oscillator.stop(audioContext.currentTime + 0.2);
}

function addValue(value) {

    display.value += value;

    clickSound.currentTime = 0;
    clickSound.play();
}

function clearDisplay() {

    display.value = "";

    clickSound.currentTime = 0;
    clickSound.play();
}

function celebrate() {

    for (let i = 0; i < 25; i++) {

        let emoji = document.createElement("div");

        emoji.innerHTML = "";

        emoji.style.position = "fixed";
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.top = "-20px";
        emoji.style.fontSize = "30px";

        document.body.appendChild(emoji);

        emoji.animate(
            [
                { transform: "translateY(0)" },
                { transform: "translateY(100vh)" }
            ],
            {
                duration: 3000
            }
        );

        setTimeout(() => {
            emoji.remove();
        }, 3000);
    }
}

function calculate() {

    try {

        display.value = eval(display.value);

        // Success beep
        playSound(900);

        celebrate();

        display.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.15)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 400
            }
        );

    }
    catch {

        display.value = "😢 Try Again!";

        // Error beep
        playSound(150);
    }
}