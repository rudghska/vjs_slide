const SLIDE_SIZE = 600;
const MOVE_XPOS = 100;
const btn = document.querySelector('.buttons');
const slider = document.querySelector('.slider');
const slideElems = slider.children;
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

let counter = 1;
let currentPos = 600;
let posX1 = 0;
let posX2 = 0;
let firstPosX = 0;
let currentBtn = btn.children;
let beforeBtn = currentBtn[0];

currentBtn[0].style.backgroundColor = 'black';
slider.style.transform = `translateX(-${SLIDE_SIZE * counter}px)`;

// button event & slideElement 함수 리팩토링

function slideElement(counter) {
  let btnCounter = counter;

  if (btnCounter === 6) btnCounter = 1;
  if (btnCounter === 0) btnCounter = 5;

  currentPos = SLIDE_SIZE * counter;
  slider.style.transform = `translateX(-${counter * SLIDE_SIZE}px)`;

  beforeBtn.style.backgroundColor = 'lightgrey';
  currentBtn[btnCounter - 1].style.backgroundColor = 'black';
  beforeBtn = currentBtn[btnCounter - 1];
}

function dragStart(e) {
  firstPosX = posX1 = e.clientX;
  document.onmousemove = dragAction;
  document.onmouseup = dragEnd;
}

function dragAction(e) {
  posX2 = posX1 - e.clientX;
  posX1 = e.clientX;
  slider.style.transform = `translateX(-${(currentPos += posX2)}px)`;
}

function dragEnd() {
  slider.classList.add('move');

  if (firstPosX - posX1 > MOVE_XPOS) {
    slideElement(++counter);
  } else if (firstPosX - posX1 < -MOVE_XPOS) {
    slideElement(--counter);
  } else {
    slideElement(counter);
  }
  document.onmouseup = null;
  document.onmousemove = null;
}

btn.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  slider.classList.add('move');
  counter = parseInt(e.target.classList[1]);
  slideElement(counter);
});

nextBtn.addEventListener('click', () => {
  slider.classList.add('move');
  ++counter === slideElems.length ? slideElement(--counter) : slideElement(counter);
});

prevBtn.addEventListener('click', () => {
  if (counter === 0) counter = 1;
  slider.classList.add('move');
  --counter === slideElems.length ? slideElement(++counter) : slideElement(counter);
});

slider.addEventListener('transitionend', e => {
  slider.classList.remove('move');

  if (slideElems[counter].id === 'lastSlide') {
    slideElement((counter = 1));
  }
  if (slideElems[counter].id === 'firstSlide') {
    slideElement((counter = slideElems.length - 2));
  }
});

slider.addEventListener('mousedown', dragStart);
