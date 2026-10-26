const thingList = document.getElementById("thing-list");
const thingCount = document.getElementById("thing-count");
const thingOverlay = document.getElementById("thing-overlay");
const randomNumber = document.getElementById("random-number");
const randomText = document.getElementById("random-text");

let lastThingIndex = -1;

const formatNumber = (index) => String(index + 1).padStart(3, "0");

const renderThings = () => {
  thingList.innerHTML = "";

  THINGS.forEach((text, index) => {
    const item = document.createElement("li");
    item.className = "thing-card";

    const number = document.createElement("span");
    number.className = "thing-number";
    number.textContent = formatNumber(index);

    const paragraph = document.createElement("p");
    paragraph.className = "thing-text";
    paragraph.textContent = text;

    item.append(number, paragraph);
    thingList.appendChild(item);
  });

  thingCount.textContent = `${THINGS.length}条`;
};

const drawThing = () => {
  let index = lastThingIndex;

  while (index === lastThingIndex) {
    index = Math.floor(Math.random() * THINGS.length);
  }

  randomNumber.textContent = formatNumber(index);
  randomText.textContent = THINGS[index];
  thingOverlay.hidden = false;
  lastThingIndex = index;
};

const closeThingOverlay = () => {
  thingOverlay.hidden = true;
};

document.getElementById("draw-thing").addEventListener("click", drawThing);
document.getElementById("draw-again").addEventListener("click", drawThing);
document.getElementById("close-overlay").addEventListener("click", closeThingOverlay);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !thingOverlay.hidden) {
    closeThingOverlay();
  }
});

renderThings();
