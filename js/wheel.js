const wheelCanvas = document.getElementById("wheel-canvas");
const wheelStage = document.querySelector(".wheel-stage");
const wheelResult = document.getElementById("wheel-result");
const spinButton = document.getElementById("spin-wheel");
const wheelContext = wheelCanvas.getContext("2d");
const devicePixelRatio = Math.max(window.devicePixelRatio || 1, 1);

let rotation = 0;
let spinning = false;

const setupWheelCanvas = () => {
  const rect = wheelStage.getBoundingClientRect();
  wheelCanvas.width = Math.round(rect.width * devicePixelRatio);
  wheelCanvas.height = Math.round(rect.width * devicePixelRatio);
  wheelContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  drawWheel();
};

const drawWheel = () => {
  const width = wheelCanvas.width / devicePixelRatio;
  const height = wheelCanvas.height / devicePixelRatio;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;
  const segmentAngle = (Math.PI * 2) / WHEEL_OPTIONS.length;
  const colors = ["#ffcf5c", "#ff5f6d", "#75c97a", "#6fc7f5", "#b48bf5", "#ffe4e8", "#fff5e8", "#ffd9a0"];

  WHEEL_OPTIONS.forEach((label, index) => {
    const startAngle = -Math.PI / 2 + index * segmentAngle;

    wheelContext.beginPath();
    wheelContext.moveTo(centerX, centerY);
    wheelContext.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle);
    wheelContext.closePath();
    wheelContext.fillStyle = colors[index % colors.length];
    wheelContext.fill();
    wheelContext.strokeStyle = "#2f241c";
    wheelContext.lineWidth = 3;
    wheelContext.stroke();

    wheelContext.save();
    wheelContext.translate(centerX, centerY);
    wheelContext.rotate(startAngle + segmentAngle / 2);
    wheelContext.fillStyle = "#2f241c";
    wheelContext.font = "bold 14px 'PingFang SC', 'Microsoft YaHei', sans-serif";
    wheelContext.textAlign = "right";
    wheelContext.fillText(label, radius - 16, 5);
    wheelContext.restore();
  });

  wheelContext.beginPath();
  wheelContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
  wheelContext.strokeStyle = "#2f241c";
  wheelContext.lineWidth = 4;
  wheelContext.stroke();
};

const spinWheel = () => {
  if (spinning) return;

  spinning = true;
  spinButton.disabled = true;

  const segmentAngle = 360 / WHEEL_OPTIONS.length;
  const selectedIndex = Math.floor(Math.random() * WHEEL_OPTIONS.length);
  const targetAngle = -(selectedIndex + 0.5) * segmentAngle;
  const normalizedTarget = ((targetAngle % 360) + 360) % 360;
  const currentNormalized = ((rotation % 360) + 360) % 360;
  const delta = (normalizedTarget - currentNormalized + 360) % 360;

  rotation += 6 * 360 + delta;
  wheelCanvas.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    spinning = false;
    spinButton.disabled = false;
    wheelResult.textContent = `今天吃：${WHEEL_OPTIONS[selectedIndex]}`;
  }, 3400);
};

spinButton.addEventListener("click", spinWheel);
window.addEventListener("resize", setupWheelCanvas);

setupWheelCanvas();
