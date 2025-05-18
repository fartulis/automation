// V2.4.5: Fixed card generation and rendering in carousel

const cardsData = [
  { icon: '🎵', title: 'Audio Devices', key: 'audio' },
  { icon: '💡', title: 'Lighting', key: 'lighting' },
  { icon: '🌡️', title: 'Climate', key: 'climate' },
  { icon: '🔒', title: 'Security', key: 'security' },
  { icon: '⚙️', title: 'Settings', key: 'settings' }
];

let currentIndex = 0;
let loggedInUser = localStorage.getItem("username") || null;
const isAdmin = loggedInUser === "admin";

const userPanel = document.getElementById("userPanel");
const loginBox = document.getElementById("loginBox");
const cardsEl = document.getElementById("cards");
const dotsEl = document.getElementById("dots");

function showUserPanel() {
  if (loggedInUser) {
    userPanel.innerHTML = `Welcome: ${loggedInUser} <button onclick="logout()">Logout</button>`;
    loginBox.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("username");
  location.href = "index.html";
}

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  if ((u === "user1" && p === "user1") || (u === "admin" && p === "admin")) {
    localStorage.setItem("username", u);
    location.href = "index.html";
  } else {
    alert("Invalid login");
  }
}

function createCarousel() {
  cardsEl.innerHTML = '';
  dotsEl.innerHTML = '';

  cardsData.forEach((data, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.key = data.key;
    card.innerHTML = `<div class="card-icon">${data.icon}</div><div class="card-title">${data.title}</div>`;
    card.addEventListener("click", () => handleCardClick(data.key));
    cardsEl.appendChild(card);

    const dot = document.createElement("div");
    dot.className = "dot";
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
    dotsEl.appendChild(dot);
  });
  updateCarousel();
}

function updateCarousel() {
  const cards = cardsEl.children;
  const left = (currentIndex - 1 + cardsData.length) % cardsData.length;
  const right = (currentIndex + 1) % cardsData.length;

  Array.from(cards).forEach((card, i) => {
    card.classList.remove("active");
    if (i === currentIndex) card.classList.add("active");
    card.style.order = i === left ? 1 : i === currentIndex ? 2 : i === right ? 3 : 4;
  });

  Array.from(dotsEl.children).forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
}

function handleCardClick(key) {
  if (!loggedInUser) {
    cardsEl.classList.add("shake");
    setTimeout(() => cardsEl.classList.remove("shake"), 400);
    alert("USER login is needed");
    return;
  }
  if (loggedInUser !== "admin" && key === "settings") {
    cardsEl.classList.add("shake");
    setTimeout(() => cardsEl.classList.remove("shake"), 400);
    alert("Admin password is needed");
    return;
  }
  window.location.href = `pages/${key}.html`;
}

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.onclick = () => {
    document.body.classList.toggle("light-theme");
    const newTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "light" ? "🌞" : "🌙";
  };
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "🌞";
  }
}

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) loginBtn.onclick = login;

createCarousel();
showUserPanel();
