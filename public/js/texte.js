let x = 0,
  text;
text =
  "Bonjour je m'appel Maxime, je suis développeur web ! Bienvenue sur mon portfolio !";

function typing() {
  if (x < text.length) {
    document.getElementById('texte').innerHTML += text.charAt(x);
    x++;
    setTimeout(typing, 60);
  }
}
setTimeout(function() {
  typing();
}, 2500);
