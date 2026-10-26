// Three ready-to-ship highlights for each highlight from the rest of the catalog.
function createPriorityPicker(ready, others, random = Math.random) {
  const bags = { ready: [], others: [] };
  let turn = 0;
  let last = null;
  function draw(name, source) {
    if (!bags[name].length) {
      bags[name] = [...source];
      for (let i = bags[name].length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [bags[name][i], bags[name][j]] = [bags[name][j], bags[name][i]];
      }
    }
    let index = bags[name].length - 1;
    if (bags[name][index] === last && index > 0) index--;
    const item = bags[name].splice(index, 1)[0];
    last = item;
    return item;
  }
  return () => {
    const preferReady = turn++ % 4 !== 3;
    if (ready.length && (preferReady || !others.length)) return draw('ready', ready);
    if (others.length) return draw('others', others);
    return null;
  };
}

const carousel = document.querySelector('.hero-carousel');
const banner = carousel.querySelector('.carousel-slide');
const catalog = [...document.querySelectorAll('#colecao .board-card')].map(card => {
  const photo = card.querySelector('img');
  const ready = !!card.closest('#colecao');
  const order = !!card.closest('#encomendas');
  return {
    image: photo.getAttribute('src'),
    alt: photo.alt,
    title: card.querySelector('h3').textContent.replace(/\s*[—–-]\s*/g, ' ').replace(/\s+/g, ' ').trim(),
    description: card.querySelector('.board-info p').textContent,
    href: card.querySelector('.board-info .text-link').href,
    ready,
    label: ready ? 'À PRONTA ENTREGA' : order ? 'SOB ENCOMENDA' : 'TÁBUAS E KITS',
    action: ready ? 'Consultar esta peça' : order ? 'Consultar esta seleção' : 'Consultar este modelo'
  };
});
const pick = createPriorityPicker(catalog.filter(item => item.ready), catalog.filter(item => !item.ready));
carousel.querySelectorAll('.carousel-slide').forEach((slide, i) => { if (i > 0) slide.remove(); });
const indicator = carousel.querySelector('.carousel-dots');
indicator.replaceChildren();
indicator.removeAttribute('role');
indicator.removeAttribute('aria-label');
indicator.className = 'carousel-current';
const photoLink = banner.querySelector('.hero-photo');
const image = photoLink.querySelector('img');
const title = banner.querySelector('.banner-title');
const eyebrow = banner.querySelector('.eyebrow');
const description = banner.querySelector('.intro');
const action = banner.querySelector('.button');
const status = carousel.querySelector('.carousel-status');
const pauseButton = carousel.querySelector('.carousel-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
let timer;
let history = [];
let historyIndex = -1;
let upcoming = pick();
function preloadUpcoming() {
  if (!upcoming) return;
  const preload = new Image();
  preload.src = upcoming.image;
}
function render(item, announce) {
  image.src = item.image;
  image.alt = item.alt;
  title.textContent = item.title;
  eyebrow.textContent = item.label;
  description.textContent = item.description;
  indicator.textContent = item.label;
  action.href = item.href;
  action.target = '_blank';
  action.rel = 'noopener noreferrer';
  photoLink.href = item.image;
  photoLink.removeAttribute('target');
  photoLink.removeAttribute('rel');
  photoLink.setAttribute('aria-label', `Ampliar foto: ${item.title}`);
  action.textContent = `${item.action} ↗`;
  banner.setAttribute('aria-label', `${item.label}: ${item.title}`);
  if (announce) status.textContent = `${item.label}: ${item.title}`;
}
function next(announce = false) {
  if (historyIndex < history.length - 1) {
    historyIndex++;
  } else {
    const item = upcoming;
    if (!item) return;
    history.push(item);
    historyIndex = history.length - 1;
    upcoming = pick();
    preloadUpcoming();
  }
  render(history[historyIndex], announce);
}
function scheduleSlide() {
  clearInterval(timer);
  if (!paused && !document.hidden && !document.querySelector('#image-viewer').open && !carousel.matches(':hover') && !carousel.contains(document.activeElement)) {
    timer = setInterval(() => next(), 3000);
  }
}
function updatePause() {
  pauseButton.textContent = paused ? 'Reproduzir' : 'Pausar';
  pauseButton.setAttribute('aria-pressed', String(paused));
  scheduleSlide();
}
photoLink.addEventListener('click', event => {
  event.preventDefault();
  clearInterval(timer);
  enlargedImage.src = image.src;
  enlargedImage.alt = image.alt;
  caption.textContent = image.alt;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  viewer.showModal();
});
carousel.querySelector('.carousel-prev').addEventListener('click', () => {
  if (historyIndex > 0) { historyIndex--; render(history[historyIndex], true); }
  scheduleSlide();
});
carousel.querySelector('.carousel-next').addEventListener('click', () => { next(true); scheduleSlide(); });
pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); });
carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', scheduleSlide);
carousel.addEventListener('focusin', () => clearInterval(timer));
carousel.addEventListener('focusout', () => setTimeout(scheduleSlide, 0));
document.addEventListener('visibilitychange', scheduleSlide);
document.getElementById('image-viewer').addEventListener('close', scheduleSlide);
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updatePause(); });
next();
updatePause();
