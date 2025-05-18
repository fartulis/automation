// script.js_V2.5.2
// Version: V2.5.2 - 3D carousel logic, login, theme toggle, clickable cards

document.addEventListener('DOMContentLoaded', () => {
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
  const dotsContainer = document.getElementById('dots');
  const themeToggle = document.getElementById('themeToggle');

  const cards = data.map((item, i) => {
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
    dotsContainer.appendChild(dot);
    return card;
  });

  function render() {
    cards.forEach((card, i) => {
      let offset = i - index;
      if (offset > CARDS / 2) offset -= CARDS;
      if (offset < -CARDS / 2) offset += CARDS;

      const deg = offset * ANGLE;
      const z = offset === 0 ? 340 : 160;
      const scale = offset === 0 ? 1.05 : 0.6;

      card.style.transform = `translate(-50%, -50%) rotateY(${deg}deg) translateZ(${z}px) scale(${scale})`;
      card.classList.toggle('active', offset === 0);

      if (offset === 0) {
        card.onclick = () => {
          const username = localStorage.getItem('username');
          if (!username) {
            alert('Login is required.');
          } else {
            window.location.href = `pages/${data[i].key}.html`;
          }
        };
        card.style.cursor = 'pointer';
      } else {
        card.onclick = null;
        card.style.cursor = 'default';
      }
    });

    [...dotsContainer.children].forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  document.getElementById('prevBtn').onclick = () => {
    index = (index - 1 + CARDS) % CARDS;
    render();
  };
  document.getElementById('nextBtn').onclick = () => {
    index = (index + 1) % CARDS;
    render();
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') document.getElementById('prevBtn').click();
    if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
  });

  document.getElementById('loginBtn').onclick = () => {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if ((user === 'admin' && pass === 'admin') || (user === 'user1' && pass === 'user1')) {
      localStorage.setItem('username', user);
      localStorage.setItem('loginTime', new Date().toLocaleString());
      location.reload();
    } else {
      alert('Invalid credentials');
    }
  };

  themeToggle.onclick = () => {
    document.body.classList.toggle('light-theme');
  };

  const user = localStorage.getItem('username');
  const time = localStorage.getItem('loginTime');

  if (user) {
    document.getElementById('loginBox').style.display = 'none';
    const panel = document.getElementById('userPanel');
    panel.innerHTML = `Welcome: ${user}<br>Last login: ${time}<br><button onclick="localStorage.clear(); location.reload();">Logout</button>`;
  }

  render();
});
