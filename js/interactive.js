const loveNote = document.getElementById("love-note");
const changeNoteButton = document.getElementById("change-note");
const prizeText = document.getElementById("scratch-prize");
const scratchStage = document.querySelector(".scratch-stage");
const scratchCanvas = document.getElementById("scratch-canvas");
const newPrizeButton = document.getElementById("new-prize");
const scratchContext = scratchCanvas.getContext("2d");

let lastNoteIndex = -1;
let lastPrizeIndex = -1;
let drawing = false;
let clearedCells = new Set();
const devicePixelRatio = Math.max(window.devicePixelRatio || 1, 1);

const randomIndex = (length, exclude) => {
  let index = exclude;

  while (index === exclude) {
    index = Math.floor(Math.random() * length);
  }

  return index;
};

const showLoveNote = () => {
  const index = randomIndex(LOVE_NOTES.length, lastNoteIndex);
  loveNote.textContent = LOVE_NOTES[index];
  lastNoteIndex = index;
};

const showPrize = () => {
  const index = randomIndex(PRIZES.length, lastPrizeIndex);
  prizeText.textContent = PRIZES[index];
  lastPrizeIndex = index;
};

const setupScratchCanvas = () => {
  const rect = scratchStage.getBoundingClientRect();
  scratchCanvas.width = Math.round(rect.width * devicePixelRatio);
  scratchCanvas.height = Math.round(rect.height * devicePixelRatio);
  scratchContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
};

const drawScratchCover = () => {
  const width = scratchCanvas.width / devicePixelRatio;
  const height = scratchCanvas.height / devicePixelRatio;

  scratchContext.globalCompositeOperation = "source-over";
  scratchContext.clearRect(0, 0, width, height);
  scratchContext.fillStyle = "#d9c5b3";
  scratchContext.fillRect(0, 0, width, height);
  scratchContext.fillStyle = "#c2ab98";

  for (let x = 0; x < width; x += 16) {
    for (let y = 0; y < height; y += 16) {
      if ((x / 16 + y / 16) % 2 === 0) {
        scratchContext.fillRect(x, y, 16, 16);
      }
    }
  }

  scratchContext.fillStyle = "#7c6656";
  scratchContext.font = "bold 16px 'PingFang SC', 'Microsoft YaHei', sans-serif";
  scratchContext.textAlign = "center";
  scratchContext.fillText("刮开这里", width / 2, height / 2 + 5);
};

const scratch = (event) => {
  event.preventDefault();

  const rect = scratchCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  scratchContext.globalCompositeOperation = "destination-out";
  scratchContext.beginPath();
  scratchContext.arc(x, y, 20, 0, Math.PI * 2);
  scratchContext.fill();

  const cellX = Math.floor(x / 10);
  const cellY = Math.floor(y / 10);

  for (let i = -2; i <= 2; i += 1) {
    for (let j = -2; j <= 2; j += 1) {
      clearedCells.add(`${cellX + i},${cellY + j}`);
    }
  }

  const width = scratchCanvas.width / devicePixelRatio;
  const height = scratchCanvas.height / devicePixelRatio;
  const totalCells = Math.ceil(width / 10) * Math.ceil(height / 10);

  if (clearedCells.size / totalCells > 0.62) {
    scratchContext.clearRect(0, 0, width, height);
  }
};

const startScratch = (event) => {
  drawing = true;
  scratch(event);
};

const moveScratch = (event) => {
  if (drawing) {
    scratch(event);
  }
};

const endScratch = () => {
  drawing = false;
};

const resetScratch = () => {
  clearedCells.clear();
  setupScratchCanvas();
  drawScratchCover();
  showPrize();
};

changeNoteButton.addEventListener("click", showLoveNote);
newPrizeButton.addEventListener("click", resetScratch);
scratchCanvas.addEventListener("pointerdown", startScratch);
scratchCanvas.addEventListener("pointermove", moveScratch);
scratchCanvas.addEventListener("pointerup", endScratch);
scratchCanvas.addEventListener("pointerleave", endScratch);
window.addEventListener("resize", resetScratch);

showLoveNote();
resetScratch();
