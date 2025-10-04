// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// DOM Elements
const navbar = document.getElementById('navbar');
const loading = document.getElementById('loading');
const cursor = document.getElementById('cursor');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const themeDropdown = document.getElementById('themeDropdown');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const matrixRain = document.getElementById('matrixRain');
const particles = document.getElementById('particles');

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    loading.classList.add('fade-out');
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  }, 1000);
});

// Custom Cursor
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor trail effect
const trailElements = [];
for (let i = 0; i < 5; i++) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(trail);
  trailElements.push(trail);
}

let trailIndex = 0;
document.addEventListener('mousemove', (e) => {
  trailElements[trailIndex].style.left = e.clientX + 'px';
  trailElements[trailIndex].style.top = e.clientY + 'px';
  trailElements[trailIndex].style.opacity = '0.7';
  
  setTimeout(() => {
    trailElements[trailIndex].style.opacity = '0';
  }, 100);
  
  trailIndex = (trailIndex + 1) % trailElements.length;
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll progress
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = scrolled + '%';

  // Back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Back to top functionality
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Theme system
let currentTheme = 'glass';
const themes = ['glass', 'monochrome', 'deep-space', 'lava', 'quantum', 'cyber', 'neon', 'sunset', 'ocean', 'matrix'];

// Theme dropdown toggle
themeToggle.addEventListener('click', () => {
  themeDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
    themeDropdown.classList.remove('active');
  }
});

// Theme selection
document.querySelectorAll('.theme-option').forEach(option => {
  option.addEventListener('click', () => {
    const theme = option.dataset.theme;
    setTheme(theme);
    themeDropdown.classList.remove('active');
  });
});

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  
  // Handle matrix rain effect
  if (theme === 'matrix') {
    matrixRain.style.display = 'block';
    particles.style.display = 'none';
    startMatrixRain();
  } else {
    matrixRain.style.display = 'none';
    particles.style.display = 'block';
    initParticles();
  }
  
  localStorage.setItem('preferred-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('preferred-theme') || 'glass';
setTheme(savedTheme);

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  
  // Animate hamburger
  const spans = mobileToggle.querySelectorAll('span');
  if (mobileMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Particles system
function initParticles() {
  if (currentTheme === 'matrix') return;
  
  particles.innerHTML = '';
  
  for (let i = 0; i < 50; i++) {
    createParticle();
  }
}

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 8 + 's';
  particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
  
  particles.appendChild(particle);
  
  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 15000);
}

// Continuously create new particles
setInterval(() => {
  if (currentTheme !== 'matrix' && particles.children.length < 50) {
    createParticle();
  }
}, 200);

// Matrix rain effect
function startMatrixRain() {
  matrixRain.innerHTML = '';
  
  for (let i = 0; i < 100; i++) {
    createMatrixColumn();
  }
}

function createMatrixColumn() {
  const column = document.createElement('div');
  column.className = 'matrix-column';
  
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  let text = '';
  
  for (let i = 0; i < 20; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  column.textContent = text;
  column.style.left = Math.random() * 100 + '%';
  column.style.animationDelay = Math.random() * 4 + 's';
  column.style.animationDuration = (Math.random() * 4 + 2) + 's';
  
  matrixRain.appendChild(column);
  
  setTimeout(() => {
    if (column.parentNode) {
      column.parentNode.removeChild(column);
    }
  }, 8000);
}

// Continuously create matrix columns
setInterval(() => {
  if (currentTheme === 'matrix' && matrixRain.children.length < 100) {
    createMatrixColumn();
  }
}, 100);

// Initialize particles
initParticles();

// Typing animation
const typingText = document.getElementById('typingText');
const texts = ['Shahnawaj Anwar', 'a Developer', 'an Innovator', 'a Problem Solver', 'the Future'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
setTimeout(typeWriter, 2000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Skills animation on scroll
const skillProgressBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.dataset.progress;
      entry.target.style.width = progress + '%';
    }
  });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Counter animation for stats
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  counterObserver.observe(counter);
});

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  let current = 0;
  const increment = target / 100;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 20);
}

// 3D Tilt effect for cards
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.setProperty('--rotateX', rotateX + 'deg');
    card.style.setProperty('--rotateY', rotateY + 'deg');
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Show success message (you would normally send this to a server)
  alert('Thank you for your message! I\'ll get back to you soon.');
  
  // Reset form
  e.target.reset();
});

// Enhanced scroll animations
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const floatingElements = document.querySelectorAll('.floating-element');
  
  // Parallax effect for hero
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  
  // Floating elements parallax
  floatingElements.forEach((element, index) => {
    const speed = 0.2 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
  });
});

// Add interactive glow effect
document.addEventListener('mousemove', (e) => {
  const interactiveElements = document.querySelectorAll('.project-card, .skill-category, .achievement-card');
  
  interactiveElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      element.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,255,0.1), var(--bg-secondary))`;
    } else {
      element.style.background = 'var(--bg-secondary)';
    }
  });
});

console.log('🚀 Portfolio loaded successfully!');
console.log('Made with ❤️ by Shahnawaj Anwar');
