// ======= Typing Effect =======
const typingElement = document.getElementById('typing');
const words = ['Dream Chaser ✨', 'JLPT N2 Passer 🎓', 'Working in Japan 🇯🇵'];
let wordIndex = 0;
let charIndex = 0;
let typingDelay = 100;
let erasingDelay = 50;
let newWordDelay = 1500;

function type() {
  if (charIndex < words[wordIndex].length) {
    typingElement.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newWordDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if(words.length) setTimeout(type, newWordDelay + 250);
});

// ======= Section Navigation & Color Theme Switching =======
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const body = document.body;

const themeClasses = {
  home: 'home-theme',
  skills: 'skills-theme',
  projects: 'projects-theme',
  gallery: 'gallery-theme',
  contact: 'contact-theme',
};

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class on all buttons and sections
    navButtons.forEach(btn => btn.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active-section'));

    // Add active to clicked
    button.classList.add('active');
    const target = button.getAttribute('data-target');
    const targetSection = document.getElementById(target);
    if(targetSection){
      targetSection.classList.add('active-section');
    }

    // Change body class for theme
    Object.values(themeClasses).forEach(tc => body.classList.remove(tc));
    if(themeClasses[target]){
      body.classList.add(themeClasses[target]);
    }
  });
});

// ======= Gallery Overlay =======
const galleryItems = document.querySelectorAll('.gallery-item img');
const galleryOverlay = document.getElementById('galleryOverlay');
const overlayImage = document.getElementById('overlayImage');
const overlayCaption = document.getElementById('overlayCaption');
const overlayClose = document.getElementById('overlayClose');
const overlayNext = document.getElementById('overlayNext');
const overlayPrev = document.getElementById('overlayPrev');

let currentIndex = 0;

function openGalleryOverlay(index) {
  currentIndex = index;
  updateGalleryOverlay();
  galleryOverlay.hidden = false;
  galleryOverlay.focus();
  document.body.style.overflow = 'hidden'; // prevent background scroll on mobile
}

function closeGalleryOverlay() {
  galleryOverlay.hidden = true;
  document.body.style.overflow = '';
}

function updateGalleryOverlay() {
  const img = galleryItems[currentIndex];
  overlayImage.src = img.src;
  overlayImage.alt = img.alt;
  overlayCaption.textContent = img.parentElement.querySelector('figcaption').textContent;
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateGalleryOverlay();
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateGalleryOverlay();
}

galleryItems.forEach((img, index) => {
  img.addEventListener('click', () => openGalleryOverlay(index));
  img.parentElement.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGalleryOverlay(index);
    }
  });
});

overlayClose.addEventListener('click', closeGalleryOverlay);
overlayNext.addEventListener('click', showNextImage);
overlayPrev.addEventListener('click', showPrevImage);

galleryOverlay.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeGalleryOverlay();
  if(e.key === 'ArrowRight') showNextImage();
  if(e.key === 'ArrowLeft') showPrevImage();
});

// ======= Contact Form Handling =======
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill out all fields.';
    formStatus.style.color = 'red';
    return;
  }

  // Simulate success response
  formStatus.textContent = 'Message sent successfully! 🎉';
  formStatus.style.color = '#28a745';
  contactForm.reset();

  setTimeout(() => {
    formStatus.textContent = '';
  }, 3000);
});
