function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  answer.classList.toggle('active');
}
gsap.from(".hero h1", { opacity: 0, y: -50, duration: 1 });
gsap.from(".hero p", { opacity: 0, y: 30, duration: 1, delay: 0.3 });
gsap.from(".cta-btn", { opacity: 0, scale: 0.8, duration: 1, delay: 0.6 });

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    }
  });
});
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

document.querySelectorAll('.counter').forEach(counter => {
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const increment = target / 100;
  const updateCount = () => {
    count += increment;
    if (count < target) {
      counter.textContent = Math.ceil(count);
      requestAnimationFrame(updateCount);
    } else {
      counter.textContent = target;
    }
  };
  updateCount();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

function togglePricing() {
  const isYearly = document.getElementById('pricingSwitch').checked;
  const prices = document.querySelectorAll('.price');
  const monthlyPrices = [999, 1999, 2999];
  const yearlyPrices = [9590, 19190, 28790];
  prices.forEach((el, i) => {
    el.textContent = isYearly ? `₹${yearlyPrices[i]}/yr` : `₹${monthlyPrices[i]}/mo`;
  });
}

function calculateBMI() {
  const height = document.getElementById('height').value / 100;
  const weight = document.getElementById('weight').value;
  if (!height || !weight) {
    document.getElementById('bmiResult').textContent = "Please enter valid values";
    return;
  }
  const bmi = (weight / (height * height)).toFixed(1);
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Obese";
  document.getElementById('bmiResult').textContent = `Your BMI: ${bmi} (${category})`;
}