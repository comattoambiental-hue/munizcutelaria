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

