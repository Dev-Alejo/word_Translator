function palabrasJson(archivo) {
  return new Promise((resolve, reject) => {
    fetch(archivo)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function palabraRandom(palabras, palabrasMostradas) {
  var palabrasKeys = Object.keys(palabras);
  var palabrasNoMostradas = palabrasKeys.filter(palabra => !palabrasMostradas.includes(palabra));

  if (palabrasNoMostradas.length === 0) {
    // Si no hay palabras no mostradas, reiniciar el registro de palabras mostradas
    palabrasMostradas.length = 0;
    palabrasNoMostradas = shuffle(palabrasKeys); // Barajar aleatoriamente todas las palabras
  }

  var palabra_espanol = palabrasNoMostradas[0];
  var traduccion_ingles = palabras[palabra_espanol];

  palabrasNoMostradas.splice(0, 1); // Eliminar la palabra seleccionada del array de palabras no mostradas

  return [palabra_espanol, traduccion_ingles];
}

var palabras;
var palabra_espanol;
var traduccion_ingles;
var palabrasMostradas = [];

function displayWord(palabra) {
  var wordDisplay = document.getElementById('word');
  wordDisplay.textContent = palabra;
}

function iniciarJuego() {
  palabrasJson('palabras.json')
    .then(data => {
      palabras = data;
      palabrasMostradas = shuffle(Object.keys(palabras)); // Barajar aleatoriamente todas las palabras
      siguientePalabra();
    })
    .catch(error => {
      console.error(error);
    });
}

function siguientePalabra() {
  var resultDisplay = document.getElementById('result');
  resultDisplay.textContent = ''; // Limpiar mensaje de resultado anterior

  if (palabrasMostradas.length === 0) {
    // Si se han mostrado todas las palabras, barajar aleatoriamente nuevamente
    palabrasMostradas = shuffle(Object.keys(palabras));
  }

  [palabra_espanol, traduccion_ingles] = palabraRandom(palabras, palabrasMostradas);
  palabrasMostradas.push(palabra_espanol);
  displayWord(palabra_espanol);

  var input = document.getElementById('inputWord');
  input.value = ''; // Limpiar campo de texto
}

function verificarPalabra() {
  var traduccion_usuario = document.getElementById('inputWord').value;
  var resultDisplay = document.getElementById('result');

  if (traduccion_usuario.toLowerCase() === traduccion_ingles.toLowerCase()) {
    resultDisplay.textContent = '¡Correcto!';
    setTimeout(function() {
      resultDisplay.textContent = ''; // Limpiar mensaje después de un tiempo
      siguientePalabra();
    }, 1000); // 1 segundo
  } else {
    resultDisplay.textContent = `Incorrecto, la traducción es: ${traduccion_ingles}`;
    var input = document.getElementById('inputWord');
    input.value = ''; // Limpiar campo de texto
  }
}

document.addEventListener('DOMContentLoaded', function() {
  iniciarJuego();

  var form = document.getElementById('wordForm');
  var input = document.getElementById('inputWord');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario
    verificarPalabra();
  });

  input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      verificarPalabra();
    }
  });
});


