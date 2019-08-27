const right = document.querySelector('#right');
const left = document.querySelector('#left');
const project = document.getElementsByClassName('project');
let i = 0;
let b = -1;
const backgrounds = [
  `rgb(255, 175, 2)`,
  `rgb(0, 165, 8)`,
  `rgb(0, 206, 189)`,
  `rgb(36, 66, 238)`,
  `rgb(105, 0, 204)`,
  `rgb(209, 0, 199)`
];

function Slider() {
  project[i].classList.add('active');
}

right.addEventListener('click', () => {
  console.log(project);
  i++;
  b++;
  if (b === backgrounds.length) {
    b = -1;
  }
  project[i].style.backgroundColor = backgrounds[b];
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
  b--;
  project[i].style.backgroundColor = backgrounds[b];
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
