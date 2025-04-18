// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon?.addEventListener('click', () => {
  navbar?.classList.toggle('active');
  menuIcon?.classList.toggle('fa-times');
});

// Close Menu on Scroll
window.addEventListener('scroll', () => {
  if (navbar?.classList.contains('active')) {
    navbar.classList.remove('active');
    menuIcon?.classList.remove('fa-times');
  }
});

// Typing Animation
const typed = new Typed('.typed-text', {
  strings: [
    'Cse Student',
    'Frontend Developer',
    'UI/UX Designer',
    'Software Engineer',
    'App Developer',
    'Photo Editor',
    'Video Editor',
    'Freelancer'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  showCursor: true,
  cursorChar: '|',
  startDelay: 1000
});

// Skills Animation
const skillCards = document.querySelectorAll('.skill-card');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, index * 100);
    }
  });
}, { threshold: 0.5 });

skillCards.forEach(card => skillsObserver.observe(card));

// Projects Animation
const projectCards = document.querySelectorAll('.project-card');
const projectsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, index * 150);
    }
  });
}, { threshold: 0.25 });

projectCards.forEach(card => projectsObserver.observe(card));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Sticky Header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header?.classList.toggle('sticky', window.scrollY > 100);
});

// Active Navigation Link
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        const activeLink = document.querySelector(`.navbar a[href*="${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      });
    }
  });
});

// About Section Animations
const aboutSection = document.querySelector('.about');
const imageFrame = document.querySelector('.image-frame');
const aboutContent = document.querySelector('.about-content');
const aboutText = document.querySelector('.about-text');
const infoCards = document.querySelectorAll('.info-card');
const progressFills = document.querySelectorAll('.progress-fill');

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      imageFrame?.classList.add('animate');
      aboutContent?.classList.add('animate');
      aboutText?.classList.add('animate');

      infoCards.forEach((card, index) => {
        setTimeout(() => card.classList.add('animate'), index * 200);
      });

      progressFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => fill.style.width = targetWidth, 500);
      });
    }
  });
}, { threshold: 0.3 });

aboutSection && aboutObserver.observe(aboutSection);

// Progress Bar Hover Effects
document.querySelectorAll('.progress-bar').forEach(bar => {
  bar.addEventListener('mouseenter', () => {
    const fill = bar.querySelector('.progress-fill');
    fill && (fill.style.transform = 'scaleY(1.2)');
  });

  bar.addEventListener('mouseleave', () => {
    const fill = bar.querySelector('.progress-fill');
    fill && (fill.style.transform = 'scaleY(1)');
  });
});

// Contact Section Animations
const contactElements = {
  phoneCard: document.querySelector('.phone-card'),
  infoCards: document.querySelectorAll('.info-card'),
  formGroups: document.querySelectorAll('.form-group'),
  submitBtn: document.querySelector('.contact-form .btn')
};

const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      contactElements.phoneCard?.classList.add('animate');
      
      contactElements.infoCards.forEach((card, index) => {
        setTimeout(() => card.classList.add('animate'), index * 150);
      });

      contactElements.formGroups.forEach((group, index) => {
        setTimeout(() => group.classList.add('animate'), index * 100);
      });

      setTimeout(() => {
        contactElements.submitBtn?.classList.add('animate');
      }, 500);
    }
  });
}, { threshold: 0.2 });

const contactSection = document.querySelector('.contact');
contactSection && contactObserver.observe(contactSection);

// Form Submission Handling
const contactForm = document.querySelector('.contact-form');
const loader = document.querySelector('.fullscreen-loader');
const successOverlay = document.querySelector('.submit-overlay');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loader?.classList.add('active');

    try {
      const formData = new FormData(contactForm);
      
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        successOverlay?.classList.add('active');
        contactForm.reset();
        setTimeout(() => successOverlay?.classList.remove('active'), 3000);
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Failed to submit form. Please check your connection.');
    } finally {
      loader?.classList.remove('active');
    }
  });
}

// Click-to-Call Functionality
document.querySelector('.phone-card')?.addEventListener('click', () => {
  window.location.href = 'tel:+918899452167';
});

// Footer Animations
const footerCols = document.querySelectorAll('.footer-col');
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footerCols.forEach((col, index) => {
        setTimeout(() => col.classList.add('animate'), index * 150);
      });
    }
  });
}, { threshold: 0.2 });

document.querySelector('.footer') && footerObserver.observe(document.querySelector('.footer'));

// Scroll to Top Button
const scrollTop = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  scrollTop?.classList.toggle('active', window.scrollY > 300);
});

scrollTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});













// Add this to existing JS
const eduCards = document.querySelectorAll('.education-card');
eduCards.forEach(card => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate-slide');
            }
        });
    }, { threshold: 0.1 });
    observer.observe(card);
});