const data = [
  { icon: '🎵', title: 'Audio Devices', key: 'audio' },
  { icon: '💡', title: 'Lighting', key: 'lighting' },
  { icon: '🌡️', title: 'Climate', key: 'climate' },
  { icon: '🔒', title: 'Security', key: 'security' },
  { icon: '⚙️', title: 'Settings', key: 'settings' }
];
const CARDS = data.length;
const ANGLE = 360 / CARDS;
let index = 0;
const carousel = document.getElementById('carousel');
const dots = document.getElementById('dots');

function displayUserPanel() {
  const panel = document.getElementById("userPanel");
  const username = localStorage.getItem("username") || "";
  const loginTime = localStorage.getItem("loginTime") || "-";
  if (username) {
    panel.innerHTML = `Welcome: ${username}<br><small>Last login: ${loginTime}</small><br><button onclick="logout()">Logout</button>`;
    document.getElementById("loginBox").style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("loginTime");
  location.reload();
}

data.forEach((item, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="card-icon">${item.icon}</div><div class="card-title">${item.title}</div>`;
  carousel.appendChild(card);

  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.addEventListener('click', () => {
    index = i;
    render();
  });
  dots.appendChild(dot);
});

function render() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    let offset = i - index;
    if (offset > CARDS/2)  offset -= CARDS;
    if (offset < -CARDS/2) offset += CARDS;
    const deg = offset * ANGLE;
    const depth = offset === 0 ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--active-depth')) : parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--radius'));
    const scale = offset === 0 ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--active-scale')) : parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--inactive-scale'));
    card.style.transform = `translate(-50%, -50%) rotateY(${deg}deg) translateZ(${depth}px) scale(${scale})`;
    card.classList.toggle('active', offset === 0);
  });
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
}

render();

document.getElementById('prevBtn').addEventListener('click', () => {
  index = (index - 1 + CARDS) % CARDS;
  render();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  index = (index + 1) % CARDS;
  render();
});

document.getElementById("loginBtn").onclick = () => {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  if ((u === "user1" && p === "user1") || (u === "admin" && p === "admin")) {
    localStorage.setItem("username", u);
    const now = new Date();
    const ts = now.toISOString().replace("T", " ").split(".")[0];
    localStorage.setItem("loginTime", ts);
    location.reload();
  } else {
    alert("Invalid login");
  }
};

displayUserPanel();
