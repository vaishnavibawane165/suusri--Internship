function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  answer.classList.toggle('active');
}