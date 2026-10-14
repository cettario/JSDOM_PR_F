const gallery = document.querySelector('[data-gallery]');
const slides = Array.from(gallery.querySelectorAll('[data-slide]'));
const counter = gallery.querySelector('[data-counter]');
const previousButton = gallery.querySelector('[data-prev]');
const nextButton = gallery.querySelector('[data-next]');
let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle('visible', i === currentSlide);
    slide.setAttribute('aria-hidden', String(i !== currentSlide));
  });
  counter.textContent = `${currentSlide + 1} / ${slides.length}`;
}

previousButton.addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

nextButton.addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

window.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target instanceof HTMLInputElement) return;
  if (event.key === 'ArrowRight') {
    showSlide(currentSlide + 1);
    event.preventDefault();
  } else if (event.key === 'ArrowLeft') {
    showSlide(currentSlide - 1);
    event.preventDefault();
  }
});

gallery.addEventListener('mouseenter', () => {
  gallery.classList.add('hovered');
});

gallery.addEventListener('mouseleave', () => {
  gallery.classList.remove('hovered');
});

showSlide(0);
