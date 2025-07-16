let counter = 0;
let lastShakeTime = 0;

const SHAKE_THRESHOLD = 15;  // adjust if needed
const SHAKE_TIMEOUT = 1000;  // minimum ms between shakes

const counterEl = document.getElementById("counter");
const statusEl = document.getElementById("status");

if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", handleMotion, false);
} else {
  alert("DeviceMotionEvent is not supported on this device.");
}

function handleMotion(event) {
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
      statusEl.textContent = "No";
    }, 500);
  }
}
