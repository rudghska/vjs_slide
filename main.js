const btn = document.querySelector('.buttons');
const slider = document.querySelector('.slider');

btn.addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    return;
  }
  const number = parseInt(e.target.classList[1]) - 1;
  slider.style.transform = `translateX(-${600 * number}px)`;
});
