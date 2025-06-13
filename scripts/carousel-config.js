// Carousel Configuration
const CAROUSEL_CONFIG = {
  // Card definitions
  cards: [
    {
      title: 'Audio',
      icon: '🎵',
      requiresAuth: false,
      path: 'pages/audio.html',
      adminOnly: false,
      description: 'Control audio devices and settings'
    },
    {
      title: 'Lighting',
      icon: '💡',
      requiresAuth: false,
      path: 'pages/lighting.html',
      adminOnly: false,
      description: 'Manage lighting systems and scenes'
    },
    {
      title: 'Climate',
      icon: '🌡️',
      requiresAuth: false,
      path: 'pages/climate.html',
      adminOnly: false,
      description: 'Control temperature and HVAC systems'
    },
    {
      title: 'Security',
      icon: '🔒',
      requiresAuth: true,
      path: 'pages/security.html',
      adminOnly: false,
      description: 'Access security system controls'
    },
    {
      title: 'Entertainment',
      icon: '📺',
      requiresAuth: false,
      path: 'pages/entertainment.html',
      adminOnly: false,
      description: 'Control entertainment systems'
    },
    {
      title: 'Energy',
      icon: '🔋',
      requiresAuth: true,
      path: 'pages/energy.html',
      adminOnly: false,
      description: 'View energy usage and settings'
    },
    {
      title: 'Water',
      icon: '💧',
      requiresAuth: true,
      path: 'pages/water.html',
      adminOnly: false,
      description: 'Control water systems'
    },
    {
      title: 'Settings',
      icon: '⚙️',
      requiresAuth: true,
      path: 'pages/settings.html',
      adminOnly: true,
      description: 'System configuration and administration'
    }
  ],

  // Visual settings
  settings: {
    perspective: 1000,
    rotationSpeed: 1000,
    spacing: 300,
    transitionDuration: 0.3,
    cardSize: {
      width: 200,
      height: 240
    },
    colors: {
      background: 'rgba(255,255,255,0.1)',
      text: '#ffffff',
      accent: '#4CAF50'
    },
    theme: {
      dark: {
        background: '#1a1a1a',
        text: '#ffffff',
        accent: '#4CAF50'
      },
      light: {
        background: '#ffffff',
        text: '#000000',
        accent: '#4CAF50'
      }
    }
  }
};

export default CAROUSEL_CONFIG;
