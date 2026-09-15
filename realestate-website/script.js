/* ===== Apex Realty - JavaScript Logic ===== */

document.addEventListener('DOMContentLoaded', () => {
  initGSAP();
  initScrollProgress();
  initContactForm();
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

function filterProperty(category, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.property-card').forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
      gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 });
    } else {
      card.style.display = 'none';
    }
  });
}

function openTourModal(propName = '') {
  const modal = document.getElementById('tourModal');
  if (modal) modal.classList.add('active');
  if (propName) alert(`🏛️ Selected Property for Visit: ${propName}`);
}

function closeTourModal() {
  const modal = document.getElementById('tourModal');
  if (modal) modal.classList.remove('active');
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn = document.getElementById('contactSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Submitting...';
    btn.disabled = true;

    const payload = {
      industry: 'RealEstate',
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      phone: document.getElementById('contactPhone').value.trim(),
      message: document.getElementById('contactMessage').value.trim()
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        status.textContent = '✅ Real Estate Inquiry Submitted Successfully!';
        status.style.color = '#34d399';
        form.reset();
      } else {
        status.textContent = '⚠️ ' + (data.message || 'Inquiry failed');
        status.style.color = '#f87171';
      }
    } catch (err) {
      console.error('Backend server connection error:', err);
      status.textContent = '❌ Unable to submit inquiry. Please check your connection and try again.';
      status.style.color = '#f87171';
    } finally {
      btn.disabled = false;
    }
  });
}

function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  const topBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (bar) bar.style.width = (window.scrollY / h) * 100 + '%';
    if (topBtn) {
      if (window.scrollY > 400) topBtn.classList.add('show');
      else topBtn.classList.remove('show');
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-content h1', { opacity: 0, y: 30, duration: 0.8 });
  gsap.from('.property-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, scrollTrigger: '.property-card' });
}
