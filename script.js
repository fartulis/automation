// script.js_V2.5.2
// Version: V2.5.2 - 3D carousel logic, login, theme toggle, clickable cards

document.addEventListener('DOMContentLoaded', () => {
  const data = [
    { icon: '🎵', title: 'Audio Devices', key: 'audio', description: 'Control your home audio system' },
    { icon: '💡', title: 'Lighting', key: 'lighting', description: 'Adjust lights and scenes' },
    { icon: '🌡️', title: 'Climate', key: 'climate', description: 'Manage temperature and HVAC' },
    { icon: '🔒', title: 'Security', key: 'security', description: 'Monitor and control security systems' },
    { icon: '⚙️', title: 'Settings', key: 'settings', description: 'Configure system preferences' },
    { icon: '📺', title: 'Entertainment', key: 'entertainment', description: 'Control media devices' },
    { icon: '🔋', title: 'Energy', key: 'energy', description: 'Monitor power usage' },
    { icon: '💧', title: 'Water', key: 'water', description: 'Control water systems' },
    { icon: '📱', title: 'Devices', key: 'devices', description: 'Manage connected devices' },
    { icon: '🏠', title: 'Home', key: 'home', description: 'Quick access to home controls' }
  ];

  // Add loading state
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loadingOverlay);
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
      const z = Math.abs(offset) <= 1 ? 340 : (Math.abs(offset) <= 2 ? 280 : 220);
      const scale = Math.abs(offset) <= 1 ? 1.1 : (Math.abs(offset) <= 2 ? 0.9 : 0.7);
      const opacity = Math.abs(offset) <= 2 ? 1 : 0.8;

      card.style.transform = `translate(-50%, -50%) rotateY(${deg}deg) translateZ(${z}px) scale(${scale})`;
      card.style.opacity = opacity;
      card.classList.toggle('active', offset === 0);

      // Add click handler with loading state
      if (offset === 0) {
        card.onclick = async () => {
          loadingOverlay.style.display = 'flex';
          try {
            const username = localStorage.getItem('username');
            if (!username) {
              document.getElementById('loginBox').style.display = 'flex';
              return;
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Navigate to page
            const page = data[index].key;
            window.location.hash = `#${page}`;
          } catch (error) {
            console.error('Error:', error);
          } finally {
            loadingOverlay.style.display = 'none';
          }
        };
      }
    });

    // Update dots
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };

  // Initialize carousel
  render();

  // Add navigation handlers
  document.getElementById('prevBtn').onclick = () => {
    index = (index - 1 + CARDS) % CARDS;
    render();
  };

  document.getElementById('nextBtn').onclick = () => {
    index = (index + 1) % CARDS;
    render();
  };

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      document.getElementById('prevBtn').click();
    } else if (e.key === 'ArrowRight') {
      document.getElementById('nextBtn').click();
    }
  });

  // Add touch support
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) { // Threshold for swipe
      if (diff > 0) {
        document.getElementById('nextBtn').click();
      } else {
        document.getElementById('prevBtn').click();
      }
    }
  });

  // Add theme toggle
  themeToggle.onclick = () => {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
  };

  // Initialize theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = '🌙';
  } else {
    document.body.classList.remove('light-theme');
    themeToggle.textContent = '☀️';
  }

  // Add authentication
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.onclick = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulate authentication
    if (username && password) {
      localStorage.setItem('username', username);
      localStorage.setItem('loginTime', Date.now());
      document.getElementById('loginBox').style.display = 'none';
    } else {
      alert('Please enter both username and password');
    }
  };

  // Check login status
  const user = localStorage.getItem('username');
  if (!user) {
    document.getElementById('loginBox').style.display = 'flex';
  } else {
    const time = localStorage.getItem('loginTime');
    const now = Date.now();
    if (now - time > 3600000) { // 1 hour session
      localStorage.removeItem('username');
      localStorage.removeItem('loginTime');
      document.getElementById('loginBox').style.display = 'flex';
    }
  };
});
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
