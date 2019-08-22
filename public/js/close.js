const msgs = document.querySelectorAll('.msg');
const btn = document.querySelector('.close');

msgs.forEach(msg => {
  btn.addEventListener('click', () => {
    msg.style.display = 'none';
  });
});
