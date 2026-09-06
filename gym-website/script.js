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