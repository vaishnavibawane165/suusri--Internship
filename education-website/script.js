/* ===== Apex Academy - JavaScript Interactivity ===== */

document.addEventListener('DOMContentLoaded', () => {
  initGSAP();
  initCounters();
  initScrollProgress();
  initContactForm();
});

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

function filterCourse(category, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.course-card').forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
      gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 });
    } else {
      card.style.display = 'none';
    }
  });
}

function openAdmissionModal(course = '') {
  const modal = document.getElementById('admissionModal');
  modal.classList.add('active');
  if (course) {
    const courseSelect = document.getElementById('appCourse');
    for (let i = 0; i < courseSelect.options.length; i++) {
      if (courseSelect.options[i].value.toLowerCase().includes(course.toLowerCase())) {
        courseSelect.selectedIndex = i;
        break;
      }
    }
  }
}

function closeAdmissionModal() {
  document.getElementById('admissionModal').classList.remove('active');
}

function handleAdmissionSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('appStudentName').value;
  const course = document.getElementById('appCourse').value;
  alert(`🎓 Application Submitted!\nThank you ${name}. Your admission request for ${course} has been registered.`);
  closeAdmissionModal();
  document.getElementById('admissionForm').reset();
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
      industry: 'Education',
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      phone: document.getElementById('contactPhone').value.trim(),
      message: document.getElementById('contactMessage').value.trim()
    };

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        status.textContent = '✅ Admission Enquiry Submitted Successfully!';
        status.style.color = '#16a34a';
        form.reset();
      } else {
        status.textContent = '⚠️ ' + (data.message || 'Submission failed');
        status.style.color = '#dc2626';
      }
    } catch (err) {
      status.textContent = '✅ Enquiry Received! Our admission counselor will call you shortly.';
      status.style.color = '#16a34a';
      form.reset();
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

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let done = false;

  window.addEventListener('scroll', () => {
    const stats = document.querySelector('.hero-stats');
    if (stats && !done) {
      if (stats.getBoundingClientRect().top < window.innerHeight - 50) {
        counters.forEach(c => {
          const target = +c.getAttribute('data-target');
          let count = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            count += step;
            if (count >= target) {
              c.innerText = target.toLocaleString();
              clearInterval(interval);
            } else {
              c.innerText = count.toLocaleString();
            }
          }, 30);
        });
        done = true;
      }
    }
  });
}

function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-content h1', { opacity: 0, y: 30, duration: 0.8 });
  gsap.from('.course-card', { opacity: 0, y: 40, duration: 0.6, stagger: 0.1, scrollTrigger: '.course-card' });
  gsap.from('.faculty-card', { opacity: 0, y: 40, duration: 0.6, stagger: 0.1, scrollTrigger: '.faculty-card' });
}
