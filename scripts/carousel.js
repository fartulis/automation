// Carousel Component
import CAROUSEL_CONFIG from './carousel-config.js';

class Carousel {
  constructor(container) {
    this.container = container;
    this.cards = CAROUSEL_CONFIG.cards;
    this.settings = CAROUSEL_CONFIG.settings;
    this.index = 0;
    this.isInitialized = false;
  }

  // Initialize carousel
  initialize() {
    if (this.isInitialized) return;
    
    this.createStructure();
    this.bindEvents();
    this.render();
    this.isInitialized = true;
  }

  // Create carousel structure
  createStructure() {
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';
    
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dots';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-button nav-prev';
    prevBtn.textContent = '←';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-button nav-next';
    nextBtn.textContent = '→';
    
    carouselContainer.appendChild(carousel);
    carouselContainer.appendChild(dotsContainer);
    carouselContainer.appendChild(prevBtn);
    carouselContainer.appendChild(nextBtn);
    
    this.container.appendChild(carouselContainer);
    
    this.carousel = carousel;
    this.dotsContainer = dotsContainer;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
  }

  // Bind event handlers
  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.navigate(-1));
    this.nextBtn.addEventListener('click', () => this.navigate(1));
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevBtn.click();
      if (e.key === 'ArrowRight') this.nextBtn.click();
    });
  }

  // Navigate carousel
  navigate(direction) {
    const CARDS = this.cards.length;
    this.index = (this.index + direction + CARDS) % CARDS;
    this.render();
  }

  // Render carousel
  render() {
    const cards = this.carousel.children;
    const dots = this.dotsContainer.children;
    const CARDS = this.cards.length;
    const ANGLE = 360 / CARDS;

    // Update cards
    Array.from(cards).forEach((card, i) => {
      let offset = i - this.index;
      if (offset > CARDS / 2) offset -= CARDS;
      if (offset < -CARDS / 2) offset += CARDS;

      const deg = offset * ANGLE;
      const z = Math.abs(offset) <= 1 ? 340 : (Math.abs(offset) <= 2 ? 280 : 220);
      const scale = Math.abs(offset) <= 1 ? 1.1 : (Math.abs(offset) <= 2 ? 0.9 : 0.7);
      const opacity = Math.abs(offset) <= 2 ? 1 : 0.8;

      card.style.transform = `translate(-50%, -50%) rotateY(${deg}deg) translateZ(${z}px) scale(${scale})`;
      card.style.opacity = opacity;
      card.classList.toggle('active', offset === 0);
    });

    // Update dots
    Array.from(dots).forEach((dot, i) => dot.classList.toggle('active', i === this.index));
  }

  // Create cards
  createCards() {
    this.carousel.innerHTML = '';
    this.dotsContainer.innerHTML = '';

    this.cards.forEach((card, i) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.innerHTML = `
        <div class="card-icon">${card.icon}</div>
        <div class="card-title">${card.title}</div>
        <div class="card-description">${card.description}</div>
      `;
      
      // Add click handler
      cardElement.addEventListener('click', () => this.handleCardClick(card));
      
      this.carousel.appendChild(cardElement);

      // Create navigation dot
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.addEventListener('click', () => {
        this.index = i;
        this.render();
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  // Handle card click
  handleCardClick(card) {
    // Check authentication requirements
    if (card.requiresAuth) {
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      if (card.adminOnly && !isAdmin) {
        alert('Access to this section is restricted to administrators only.');
        return;
      }
      
      // Show login modal if not authenticated
      const isAuthenticated = localStorage.getItem('username');
      if (!isAuthenticated) {
        this.showLoginModal(card);
        return;
      }
    }

    // Navigate to card page
    window.location.href = card.path;
  }

  // Show login modal
  showLoginModal(card) {
    // Create login modal
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
      <div class="login-modal-content">
        <h2>Access ${card.title}</h2>
        <form id="loginForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit" class="login-button">Login</button>
        </form>
        <button class="cancel-button">Cancel</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Handle login
    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin(card, form);
    });

    // Handle cancel
    const cancelButton = modal.querySelector('.cancel-button');
    cancelButton.addEventListener('click', () => {
      modal.remove();
    });
  }

  // Handle login
  handleLogin(card, form) {
    const username = form.username.value;
    const password = form.password.value;

    // Validate credentials
    const validCombinations = [
      { username: 'user1', password: 'user1', isAdmin: false },
      { username: 'admin', password: 'admin', isAdmin: true }
    ];

    const validUser = validCombinations.find(user => 
      user.username === username && user.password === password
    );

    if (!validUser) {
      alert('Invalid username or password');
      return;
    }

    // Store user data
    localStorage.setItem('username', username);
    localStorage.setItem('isAdmin', validUser.isAdmin);
    localStorage.setItem('lastLogin', new Date().toISOString());

    // Close modal
    const modal = document.querySelector('.login-modal');
    modal.remove();

    // Navigate to card page
    window.location.href = card.path;
  }
}

export default Carousel;
