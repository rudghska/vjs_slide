const SLIDE_SIZE = 600;

const btn = document.querySelector('.buttons');
const slider = document.querySelector('.slider');
const slideElems = slider.children;
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

let counter = 1;

let currentBtn = btn.children;
let beforeBtn = currentBtn[0];

currentBtn[0].style.backgroundColor = 'black';
slider.style.transform = `translateX(-${SLIDE_SIZE * counter}px)`;

function slideElement(counter) {
  let btnCounter = counter;

  slider.style.transform = `translateX(${-counter * SLIDE_SIZE}px)`;

  if (btnCounter === 6) btnCounter = 1;
  if (btnCounter === 0) btnCounter = 5;

  console.log(btnCounter);
  beforeBtn.style.backgroundColor = 'lightgrey';
  currentBtn[btnCounter - 1].style.backgroundColor = 'black';
  beforeBtn = currentBtn[btnCounter - 1];
}

btn.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  slider.style.transition = `transform 0.4s ease-in-out`;
  counter = parseInt(e.target.classList[1]);
  slideElement(counter);
});

nextBtn.addEventListener('click', () => {
  slider.style.transition = `transform 0.4s ease-in-out`;
  ++counter === slideElems.length ? slideElement(counter--) : slideElement(counter);
});

prevBtn.addEventListener('click', () => {
  slider.style.transition = `transform 0.4s ease-in-out`;
  --counter === slideElems.length ? slideElement(counter++) : slideElement(counter);
});

slider.addEventListener('transitionend', e => {
  if (slideElems[counter].id === 'lastSlide') {
    slider.style.transition = 'none';
    slideElement((counter = 1));
  }
  if (slideElems[counter].id === 'firstSlide') {
    slider.style.transition = 'none';
    slideElement((counter = slideElems.length - 2));
  }
});
