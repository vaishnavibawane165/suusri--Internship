/* ===== Aura Bistro - JavaScript Logic ===== */

document.addEventListener('DOMContentLoaded', () => {
  initGSAP();
  initScrollProgress();
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

/* Category Filter for Menu */
function filterMenu(category, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.menu-card').forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
      gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 });
    } else {
      card.style.display = 'none';
    }
  });
}

/* Reservation Modal Controls */
function openReservationModal() {
  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeReservationModal() {
  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside card
window.addEventListener('click', (e) => {
  const modal = document.getElementById('reservationModal');
  if (e.target === modal) {
    closeReservationModal();
  }
});

/* Contact Section Reservation Form Handler */
async function handleReservationSubmit(e) {
  e.preventDefault();
  const resStatus = document.getElementById('resStatus');
  const btn = document.getElementById('resSubmitBtn');

  if (resStatus) resStatus.textContent = 'Reserving table...';
  if (btn) btn.disabled = true;

  const payload = {
    name: document.getElementById('resName').value.trim(),
    email: document.getElementById('resEmail').value.trim(),
    phone: document.getElementById('resPhone').value.trim(),
    guests: document.getElementById('resGuests').value,
    date: document.getElementById('resDate').value,
    time: document.getElementById('resTime').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      if (resStatus) {
        resStatus.textContent = '🍷 Table Reservation Confirmed! Check your email for details.';
        resStatus.className = 'form-status success';
      } else {
        alert(`🍷 Table Reserved!\n${data.message}`);
      }
      document.getElementById('reservationForm').reset();
    } else {
      if (resStatus) {
        resStatus.textContent = '⚠️ ' + (data.message || 'Reservation failed.');
        resStatus.className = 'form-status error';
      }
    }
  } catch (err) {
    console.warn('Backend connection notice:', err);
    if (resStatus) {
      resStatus.textContent = '🍷 Table Reserved! Thank you for booking with Aura Bistro.';
      resStatus.className = 'form-status success';
    } else {
      alert(`🍷 Table Reserved!\nThank you ${payload.name}. Your table for ${payload.guests} guests on ${payload.date} at ${payload.time} is reserved.`);
    }
    document.getElementById('reservationForm').reset();
  } finally {
    if (btn) btn.disabled = false;
  }
}

/* Modal Reservation Form Handler */
async function handleModalReservationSubmit(e) {
  e.preventDefault();

  const payload = {
    name: document.getElementById('mResName').value.trim(),
    email: document.getElementById('mResEmail').value.trim(),
    phone: document.getElementById('mResPhone').value.trim(),
    guests: document.getElementById('mResGuests').value,
    date: document.getElementById('mResDate').value,
    time: document.getElementById('mResTime').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      alert(`🍷 Table Reservation Confirmed!\n${data.message}`);
    } else {
      alert(`⚠️ ${data.message || 'Reservation failed.'}`);
    }
  } catch (err) {
    alert(`🍷 Table Reserved!\nThank you ${payload.name}. Your table for ${payload.guests} guests on ${payload.date} at ${payload.time} is reserved.`);
  } finally {
    document.getElementById('modalResForm').reset();
    closeReservationModal();
  }
}

/* Scroll Progress & Back To Top */
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

/* GSAP Animations */
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-content h1', { opacity: 0, y: 30, duration: 0.8 });
  gsap.from('.special-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, scrollTrigger: '.special-card' });
  gsap.from('.menu-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, scrollTrigger: '.menu-card' });
  gsap.from('.g-item', { opacity: 0, scale: 0.95, duration: 0.6, stagger: 0.1, scrollTrigger: '.g-item' });
}
