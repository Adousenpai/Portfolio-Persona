let x = 0,
  text;
text =
  "Bonjour et bienvenue sur mon portfolio ! Je m'appelle Maxime et je suis développeur web :) !";

function typing() {
  if (x < text.length) {
    document.getElementById("texte").innerHTML += text.charAt(x);
    x++;
    setTimeout(typing, 60);
  }
}
setTimeout(function() {
  typing();
}, 2500);
