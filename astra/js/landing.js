// ============================================
// ASTRA — LANDING PAGE JS
// ============================================

// Nav scroll effect
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Fade in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .insight-card, .price-card, .ws-step, .brain-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Animate chart bars on load
window.addEventListener('load', () => {
  const bars = document.querySelectorAll('.chart-bar');
  bars.forEach((bar, i) => {
    const h = bar.style.height;
    bar.style.height = '0';
    setTimeout(() => {
      bar.style.transition = 'height 0.6s ease';
      bar.style.height = h;
    }, 300 + i * 80);
  });
});
