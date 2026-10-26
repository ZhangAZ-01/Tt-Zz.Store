const messageForm = document.getElementById("message-form");
const messageText = document.getElementById("message-text");
const messageList = document.getElementById("message-list");
const toast = document.getElementById("toast");
const storageKey = "girlfriend-messages-v1";

const saveMessages = (messages) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  } catch (error) {
    console.warn("保存本地留言失败", error);
  }
};

const loadMessages = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (error) {
    console.warn("读取本地留言失败", error);
  }

  const seededMessages = PRESET_MESSAGES.map((message, index) => ({
    ...message,
    time: Date.now() - index * 1000,
  }));

  saveMessages(seededMessages);
  return seededMessages;
};

const messages = loadMessages();

const renderMessages = () => {
  messageList.innerHTML = "";

  if (messages.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "还没有留言，写下第一句吧。";
    messageList.appendChild(empty);
    return;
  }

  messages.forEach((message) => {
    const card = document.createElement("article");
    card.className = "message-card";

    const meta = document.createElement("div");
    meta.className = "message-meta";

    const author = document.createElement("span");
    author.textContent = message.author;

    const time = document.createElement("time");
    time.textContent = new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(message.time));

    meta.append(author, time);

    const text = document.createElement("p");
    text.className = "message-text";
    text.textContent = message.text;

    const removeButton = document.createElement("button");
    removeButton.className = "button-small";
    removeButton.textContent = "删除";
    removeButton.addEventListener("click", () => deleteMessage(message.time));

    card.append(meta, text, removeButton);
    messageList.appendChild(card);
  });
};

const showMessage = (event) => {
  event.preventDefault();

  const text = messageText.value.trim();
  if (!text) return;

  messages.unshift({
    author: "她",
    text,
    time: Date.now(),
  });

  saveMessages(messages);
  renderMessages();
  messageText.value = "";
  showToast("已经写下啦");
};

const deleteMessage = (time) => {
  const index = messages.findIndex((message) => message.time === time);
  if (index !== -1) {
    messages.splice(index, 1);
    saveMessages(messages);
    renderMessages();
    showToast("已删除");
  }
};

const showToast = (text) => {
  toast.textContent = text;
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 1800);
};

messageForm.addEventListener("submit", showMessage);

renderMessages();
