let counter = 0;
let lastShakeTime = 0;
let timeLeft = 15;
let timerInterval = null;
let gameActive = true;

const SHAKE_THRESHOLD = 15;
const SHAKE_TIMEOUT = 1000;

const counterEl = document.getElementById("counter");
const statusEl = document.getElementById("status");
const timerEl = document.getElementById("timer");

// Start timer countdown
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameActive = false;
      statusEl.textContent = "Time's up!";
    }
  }, 1000);
}

if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", handleMotion, false);
  startTimer();
} else {
  alert("DeviceMotionEvent is not supported on this device.");
}

function handleMotion(event) {
  if (!gameActive) return;

  const acc = event.accelerationIncludingGravity;
  const now = Date.now();

  if (!acc) return;

  const totalAcc = Math.sqrt(
    acc.x * acc.x +
    acc.y * acc.y +
    acc.z * acc.z
  );

  if (totalAcc > SHAKE_THRESHOLD && now - lastShakeTime > SHAKE_TIMEOUT) {
    counter++;
    counterEl.textContent = counter;
    statusEl.textContent = "Yes";
    lastShakeTime = now;

    setTimeout(() => {
      if (gameActive) statusEl.textContent = "No";
    }, 500);
  }
}
