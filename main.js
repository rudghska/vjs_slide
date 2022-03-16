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

function setButtonColor(ele, beforeCounter, curCounter = counter - 1) {
  ele[beforeCounter].style.backgroundColor = 'lightgrey';
  ele[curCounter].style.backgroundColor = 'black';
  beforeBtn = ele[curCounter];
}

function slideElement(counter) {
  slider.style.transition = 'none';
  slider.style.transform = `translateX(${-counter * SLIDE_SIZE}px)`;
  beforeBtn.style.backgroundColor = 'lightgrey';
  currentBtn[counter - 1].style.backgroundColor = 'black';
  beforeBtn = currentBtn[counter - 1];
}

btn.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;

  slider.style.transition = `transform 0.4s ease-in-out`;

  beforeBtn.style.backgroundColor = 'lightgrey';
  beforeBtn = e.target;
  counter = parseInt(e.target.classList[1]);
  slider.style.transform = `translateX(-${SLIDE_SIZE * counter}px)`;
  e.target.style.backgroundColor = 'black';
});

nextBtn.addEventListener('click', () => {
  slider.style.transition = `transform 0.4s ease-in-out`;
  counter++;

  if (counter === slideElems.length) counter--;

  if (counter < 6) {
    setButtonColor(currentBtn, counter - 2);
  }
  slider.style.transform = `translateX(${-counter * SLIDE_SIZE}px)`;
});

prevBtn.addEventListener('click', () => {
  slider.style.transition = `transform 0.4s ease-in-out`;
  counter--;

  if (counter === -1) counter++;

  if (counter > 0) {
    setButtonColor(currentBtn, counter);
  }
  slider.style.transform = `translateX(${-counter * SLIDE_SIZE}px)`;
});

slider.addEventListener('transitionend', e => {
  if (slideElems[counter].id === 'lastSlide') {
    slideElement((counter = 1));
  }
  if (slideElems[counter].id === 'firstSlide') {
    slideElement((counter = slideElement.length - 2));
  }
});
