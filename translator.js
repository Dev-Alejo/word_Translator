function palabrasJson(archivo) {
  return fetch(archivo).then(res => res.json());
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let palabras = {};
let palabrasBarajadas = [];
let indiceActual = 0;

function displayWord(palabra) {
  document.getElementById('word').textContent = palabra;
}

function iniciarJuego() {
  palabrasJson('palabras.json')
    .then(data => {
      palabras = data;
      palabrasBarajadas = shuffle(Object.keys(palabras));
      indiceActual = 0;
      siguientePalabra();
    })
    .catch(console.error);
}

function siguientePalabra() {
  const resultDisplay = document.getElementById('result');
  resultDisplay.textContent = '';

  if (indiceActual >= palabrasBarajadas.length) {
    palabrasBarajadas = shuffle(Object.keys(palabras));
    indiceActual = 0;
  }

  const palabra_es = palabrasBarajadas[indiceActual];
  const traduccion_en = palabras[palabra_es];

  displayWord(palabra_es);
  document.getElementById('inputWord').value = '';

  // Guarda para comparación
  window.palabraActual = {
    espanol: palabra_es,
    ingles: traduccion_en
  };

  indiceActual++;
}

function verificarPalabra() {
  const input = document.getElementById('inputWord');
  const resultDisplay = document.getElementById('result');
  const traduccionUsuario = input.value.trim().toLowerCase();
  const respuestaCorrecta = window.palabraActual.ingles.toLowerCase();

  if (traduccionUsuario === respuestaCorrecta) {
    resultDisplay.textContent = '¡Correcto!';
    setTimeout(siguientePalabra, 1000);
  } else {
    resultDisplay.textContent = `Incorrecto, la traducción es: ${window.palabraActual.ingles}`;
    input.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  iniciarJuego();

  const form = document.getElementById('wordForm');
  const input = document.getElementById('inputWord');

  form.addEventListener('submit', e => {
    e.preventDefault();
    verificarPalabra();
  });

  input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      verificarPalabra();
    }
  });
});




