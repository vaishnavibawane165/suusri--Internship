/* ===== HealthBridge Hospital - JavaScript Logic ===== */

document.addEventListener('DOMContentLoaded', () => {
  initGSAP();
  initCounters();
  initScrollProgress();
  initContactForm();
});

/* Mobile Menu Toggle */
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  navLinks.classList.toggle('active');
  hamburgerBtn.classList.toggle('active');
}

/* Department Filtering Logic */
function filterDepartment(category, btn) {
  // Update active tab button
  const tabs = document.querySelectorAll('.dept-tab');
  tabs.forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Filter department cards
  const cards = document.querySelectorAll('.dept-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
      gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
    } else {
      card.style.display = 'none';
    }
  });
}

/* Appointment Modal Logic */
function openAppointmentModal(dept = '', doctor = '') {
  const modal = document.getElementById('appointmentModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (dept) {
    const deptSelect = document.getElementById('modalDept');
    for (let i = 0; i < deptSelect.options.length; i++) {
      if (deptSelect.options[i].value.toLowerCase().includes(dept.toLowerCase())) {
        deptSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (doctor) {
    const docSelect = document.getElementById('modalDoctor');
    for (let i = 0; i < docSelect.options.length; i++) {
      if (docSelect.options[i].value.includes(doctor)) {
        docSelect.selectedIndex = i;
        break;
      }
    }
  }
}

function closeAppointmentModal() {
  const modal = document.getElementById('appointmentModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside card
window.addEventListener('click', (e) => {
  const modal = document.getElementById('appointmentModal');
  if (e.target === modal) {
    closeAppointmentModal();
  }
});

const API_BASE_URL = '';

/* Appointment Form Handling & Backend API Integration */
async function handleAppointmentSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName').value.trim();
  const email = document.getElementById('modalEmail').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();
  const dept = document.getElementById('modalDept').value;
  const doctor = document.getElementById('modalDoctor').value;
  const date = document.getElementById('modalDate').value;
  const notes = document.getElementById('modalNotes').value.trim();

  const payload = {
    name,
    email,
    phone,
    department: dept,
    doctor,
    date,
    notes
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      alert(`✅ Appointment Confirmed!\n${result.message}`);
    } else {
      alert(`⚠️ ${result.message || 'Unable to book appointment.'}`);
    }
  } catch (err) {
    console.error('Backend server connection error:', err);
    alert('❌ Unable to book appointment. Please check your connection and try again.');
  } finally {
    document.getElementById('appointmentForm').reset();
    closeAppointmentModal();
  }
}

/* Contact Form API Submission (Express Backend /api/contact) */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = 'Sending message...';
    formStatus.className = 'form-status';
    submitBtn.disabled = true;

    const payload = {
      industry: 'Healthcare',
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      phone: document.getElementById('contactPhone').value.trim(),
      message: document.getElementById('contactMessage').value.trim()
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        formStatus.textContent = '✅ Message sent successfully! We will reply via email shortly.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        formStatus.textContent = '⚠️ ' + (result.message || 'Unable to send message.');
        formStatus.className = 'form-status error';
      }
    } catch (err) {
      console.error('Backend server connection error:', err);
      formStatus.textContent = '❌ Unable to send message. Please check your connection and try again.';
      formStatus.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* Scroll Progress & Back to Top */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (window.scrollY / windowHeight) * 100;
    if (progressBar) progressBar.style.width = scrollPercentage + '%';

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Counter Animation */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = target / 50;

      if (count < target) {
        counter.innerText = Math.ceil(count + speed);
        setTimeout(runCounters, 30);
      } else {
        counter.innerText = target.toLocaleString();
      }
    });
  };

  window.addEventListener('scroll', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats && !animated) {
      const pos = heroStats.getBoundingClientRect().top;
      if (pos < window.innerHeight - 50) {
        runCounters();
        animated = true;
      }
    }
  });
}

/* GSAP Animations */
function initGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero Section Reveals
  gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 0.6, delay: 0.1 });
  gsap.from('.hero-content h1', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
  gsap.from('.hero-content p', { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });
  gsap.from('.hero-actions', { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });
  gsap.from('.hero-main-img', { opacity: 0, scale: 0.95, duration: 1, delay: 0.4 });

  // Scroll Triggered Cards Reveal
  const sections = ['.about-grid', '.dept-card', '.doctor-card', '.package-card', '.facility-box', '.testimonial-card'];
  sections.forEach(selector => {
    gsap.utils.toArray(selector).forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  });
}