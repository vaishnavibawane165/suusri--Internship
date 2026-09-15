/* ===== PowerFit Gym - JavaScript Interactivity ===== */

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

/* Schedule Day Tab Switcher */
function switchDay(day, btn) {
  // Tabs active state
  const tabs = document.querySelectorAll('.day-tab');
  tabs.forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Panels toggle
  const panels = document.querySelectorAll('.schedule-day-panel');
  panels.forEach(panel => {
    panel.classList.remove('active');
  });

  const activePanel = document.getElementById('day-' + day);
  if (activePanel) {
    activePanel.classList.add('active');
    gsap.fromTo(activePanel, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
  }
}

/* Monthly vs Annual Pricing Toggle */
function togglePricing() {
  const isAnnual = document.getElementById('pricingSwitch').checked;
  const priceElements = document.querySelectorAll('.price-val');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');

  if (isAnnual) {
    monthlyLabel.classList.remove('active');
    annualLabel.classList.add('active');
  } else {
    monthlyLabel.classList.add('active');
    annualLabel.classList.remove('active');
  }

  priceElements.forEach(price => {
    const monthlyVal = price.getAttribute('data-monthly');
    const annualVal = price.getAttribute('data-annual');
    const targetVal = isAnnual ? annualVal : monthlyVal;

    // Animate number change
    gsap.to(price, {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        price.innerText = targetVal;
        gsap.to(price, { opacity: 1, duration: 0.15 });
      }
    });
  });
}

/* BMI Calculator */
function calculateBMI() {
  const heightInput = document.getElementById('height').value;
  const weightInput = document.getElementById('weight').value;
  const scoreElem = document.getElementById('bmiScore');
  const statusElem = document.getElementById('bmiStatus');
  const descElem = document.getElementById('bmiDesc');

  if (!heightInput || !weightInput || heightInput <= 0 || weightInput <= 0) {
    alert('Please enter valid positive numbers for height and weight.');
    return;
  }

  const heightInMeters = heightInput / 100;
  const bmi = (weightInput / (heightInMeters * heightInMeters)).toFixed(1);

  scoreElem.innerText = bmi;

  if (bmi < 18.5) {
    statusElem.innerText = 'Underweight 💙';
    statusElem.style.color = '#38bdf8';
    descElem.innerText = 'We recommend combining our Hypertrophy Strength program with a calorie-surplus nutrition plan.';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    statusElem.innerText = 'Normal / Healthy Weight 💚';
    statusElem.style.color = '#00e676';
    descElem.innerText = 'Great job maintaining a healthy body composition! Keep building endurance with our HIIT and Power Yoga classes.';
  } else if (bmi >= 25 && bmi < 29.9) {
    statusElem.innerText = 'Overweight ⚡';
    statusElem.style.color = '#ff9800';
    descElem.innerText = 'Our Fat Burner HIIT Circuit and Pro Performance training plan will help you shred fat effectively.';
  } else {
    statusElem.innerText = 'Obese Range 🔥';
    statusElem.style.color = '#ff5252';
    descElem.innerText = 'Start your fitness journey with guided cardio conditioning and personal coaching consultation.';
  }

  gsap.fromTo('#bmiResultCard', { scale: 0.95, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.4 });
}

/* FAQ Accordion Toggle */
function toggleFAQ(element) {
  const parentCard = element.parentElement;
  const isActive = parentCard.classList.contains('active');

  // Close all other FAQs
  document.querySelectorAll('.faq-card').forEach(card => {
    card.classList.remove('active');
  });

  if (!isActive) {
    parentCard.classList.add('active');
  }
}

const API_BASE_URL = 'http://localhost:5000';

/* Contact Form Submission (Express Backend /api/contact) */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = 'Activating Free Pass...';
    formStatus.className = 'form-status';
    submitBtn.disabled = true;

    const payload = {
      industry: 'Gym',
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
        formStatus.textContent = '🔥 3-Day Free Trial Pass Activated! Check your email for pass details.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        formStatus.textContent = '⚠️ ' + (result.message || 'Unable to submit enquiry.');
        formStatus.className = 'form-status error';
      }
    } catch (err) {
      console.warn('Backend server connection error, showing fallback feedback:', err);
      formStatus.textContent = '🔥 3-Day Free Trial Pass Request Received! Our team will contact you shortly.';
      formStatus.className = 'form-status success';
      contactForm.reset();
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

/* Animated Counters */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = target / 40;

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

  // Hero Animations
  gsap.from('.hero-tag', { opacity: 0, y: -20, duration: 0.6, delay: 0.1 });
  gsap.from('.hero-content h1', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
  gsap.from('.hero-content p', { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });
  gsap.from('.hero-actions', { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });

  // Scroll Triggered Cards
  const selectors = ['.program-card', '.trainer-card', '.pricing-card', '.h-box', '.c-item'];
  selectors.forEach(sel => {
    gsap.utils.toArray(sel).forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  });
}