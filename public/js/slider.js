const right = document.querySelector('#right');
const left = document.querySelector('#left');
const project = document.getElementsByClassName('project');
let i = 0;

function Slider() {
  project[i].classList.add('active');
}

right.addEventListener('click', () => {
  i++;
  project[i].classList.add('active');
  project[i - 1].classList.remove('active');
  left.style.opacity = 1;
  left.style.pointerEvents = 'visible';
  if (i + 1 === project.length) {
    right.style.opacity = 0;
    right.style.pointerEvents = 'none';
  }
});

left.addEventListener('click', () => {
  i--;
  project[i].classList.add('active');
  project[i + 1].classList.remove('active');
  right.style.pointerEvents = 'visible';
  right.style.opacity = 1;
  console.log(i);
  if (i === 0) {
    left.style.opacity = 0;
    left.style.pointerEvents = 'none';
  }
});

Slider();
