document.getElementById('year').textContent = new Date().getFullYear();
const viewer = document.getElementById('image-viewer');
const enlargedImage = viewer.querySelector('.viewer-image');
const caption = viewer.querySelector('.viewer-caption');
let previousOverflow = '';
for (const photo of document.querySelectorAll('button.board-photo')) {
  photo.addEventListener('click', () => {
    const thumbnail = photo.querySelector('img');
    enlargedImage.src = photo.dataset.image;
    enlargedImage.alt = thumbnail.alt;
    caption.textContent = thumbnail.alt;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    viewer.showModal();
  });
}
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => {
  const bounds = viewer.getBoundingClientRect();
  if (event.target === viewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    viewer.close();
  }
});
viewer.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  enlargedImage.removeAttribute('src');
});

const carousel = document.querySelector('.hero-carousel');
const slides = [...carousel.querySelectorAll('.carousel-slide')];
const dots = [...carousel.querySelectorAll('.carousel-dots button')];
const pauseButton = carousel.querySelector('.carousel-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeSlide = 0;
let paused = reducedMotion.matches;
let timer;
function showSlide(index, announce = false) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => { slide.hidden = i !== activeSlide; });
  dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === activeSlide)));
  if (announce) carousel.querySelector('.carousel-status').textContent = `Destaque ${activeSlide + 1} de ${slides.length}`;
}
function scheduleSlide() {
  clearInterval(timer);
  if (!paused && !document.hidden && !carousel.matches(':hover') && !carousel.contains(document.activeElement)) {
    timer = setInterval(() => showSlide(activeSlide + 1), 6000);
  }
}
function updatePause() {
  pauseButton.textContent = paused ? 'Reproduzir' : 'Pausar';
  pauseButton.setAttribute('aria-pressed', String(paused));
  scheduleSlide();
}
carousel.querySelector('.carousel-prev').addEventListener('click', () => { showSlide(activeSlide - 1, true); scheduleSlide(); });
carousel.querySelector('.carousel-next').addEventListener('click', () => { showSlide(activeSlide + 1, true); scheduleSlide(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i, true); scheduleSlide(); }));
pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); });
carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', scheduleSlide);
carousel.addEventListener('focusin', () => clearInterval(timer));
carousel.addEventListener('focusout', () => setTimeout(scheduleSlide, 0));
document.addEventListener('visibilitychange', scheduleSlide);
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updatePause(); });
updatePause();
