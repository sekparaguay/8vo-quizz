const preguntas = [
  { 
    pregunta: "When you walked with your eyes covered, what sense helped you the most?", 
    opciones: ["Touch", "Hearing", "Sight", "Balance"], 
    respuesta: "Hearing" 
  },
  { 
    pregunta: "In the memory challenge, what was the goal of the activity?", 
    opciones: [ "To move faster than others","To remember and repeat a sequence of movements","To imitate your partner","To invent new movements"], 
    respuesta: "To remember and repeat a sequence of movements" 
  },
  { 
    pregunta: "What word made you react and move quickly during the challenge?", 
    opciones: ["Ball","Chair","Table","Run"], 
    respuesta: "Ball" 
  },
  { 
    pregunta: "In the colors station, what did participants discover?", 
    opciones: [" Everyone sees colors in the same way.", "Colors can have personal meanings and feelings","Colors have no connection with emotions","Numbers and colors are always random."], 
    respuesta: "Colors can have personal meanings and feelings" 
  },
  { 
    pregunta: "What was the task after listening to the sounds?", 
    opciones: ["Guessing the animal","Writing the name of the sound","Dancing to the rhythm", "Drawing what the sound made you imagine"], 
    respuesta: "Drawing what the sound made you imagine" 
  }
];

// "let" crea variables que pueden cambiar durante la ejecución.

// "indice" indica qué número de pregunta se está mostrando actualmente.
// Comienza en 0, lo que significa que arranca en la primera pregunta.
let indice = 0;

// "puntaje" guarda la cantidad de respuestas correctas que el usuario lleva.
let puntaje = 0;

function mostrarPregunta() {
  // Si ya se respondieron todas las preguntas (es decir, el índice
  // es igual o mayor a la cantidad total de preguntas),
  // entonces se muestra el resultado final.
  if (indice >= preguntas.length) {
    // Borra el contenido del contenedor "quiz" (ya no se muestran más preguntas).
    document.getElementById("quiz").innerHTML = "";

    // Muestra el resultado final con el puntaje obtenido.
    document.getElementById("result").innerText = 
      `✅ Puntaje final: ${puntaje}/${preguntas.length}`;

    // Muestra el botón de "Volver a intentar".
    document.getElementById("retry-btn").style.display = "block";
    return; // Sale de la función (no sigue ejecutando más código dentro).
  }

  // Si todavía hay preguntas:
  // Toma la pregunta actual desde el array "preguntas"
  const q = preguntas[indice];

  // Crea un bloque HTML con el texto de la pregunta.
  let html = `<div class="question">${q.pregunta}</div>`;

  // Recorre todas las opciones y crea un botón para cada una.
  // "op" es cada una de las respuestas posibles dentro de "q.opciones".
  q.opciones.forEach(op => {
    // Cada botón tiene un evento onclick que llama a la función "verificarRespuesta"
    // y le pasa:
    // - "this" → el botón que se clicó.
    // - "q.respuesta" → la respuesta correcta de esa pregunta.
    html += `<button onclick="verificarRespuesta(this,'${q.respuesta}')">${op}</button>`;
  });

  // Inserta el HTML generado dentro del div con id="quiz".
  document.getElementById("quiz").innerHTML = html;

  // Limpia cualquier mensaje de puntaje anterior.
  document.getElementById("result").innerText = "";
}


function verificarRespuesta(boton, correcta) {
  // Si el texto del botón presionado es igual al texto de la respuesta correcta:
  if (boton.innerText === correcta) {
    // Añade la clase "correct" (para poner color verde).
    boton.classList.add("correct");
    // Suma 1 punto al puntaje.
    puntaje++;
  } else {
    // Si no es correcta, añade la clase "wrong" (color rojo).
    boton.classList.add("wrong");
  }

  // Espera 0.8 segundos (800 milisegundos) y luego:
  setTimeout(() => { 
    indice++; // Avanza a la siguiente pregunta.
    mostrarPregunta(); // Muestra la siguiente pregunta.
  }, 800);
}

function reiniciarQuiz() {
  // Reinicia las variables a su valor inicial.
  indice = 0; // Vuelve a la primera pregunta.
  puntaje = 0; // Reinicia el puntaje.

  // Muestra la primera pregunta otra vez.
  mostrarPregunta();

  // Oculta el botón de "Volver a intentar".
  document.getElementById("retry-btn").style.display = "none";
}


// ============================================================
// ===== INICIAR EL QUIZ AUTOMÁTICAMENTE =====
// ============================================================

// Llama a la función "mostrarPregunta()" cuando se carga la página,
// así el usuario ve la primera pregunta de inmediato.
mostrarPregunta();


// ============================================================
// ===== GENERAR CÓDIGO QR DEL QUIZ =====
// ============================================================

// Crea un nuevo código QR dentro del elemento con id="qrcode".
// Usa la librería "QRCode" que fue cargada en el HTML.
new QRCode(document.getElementById("qrcode"), {
  text: "https://cristiantorales1.github.io/quiz-museum./", // Enlace que se codifica en el QR
  width: 120,     // Ancho del código QR
  height: 120,    // Alto del código QR
  colorDark: "#222658", // Color de los cuadrados del QR
  colorLight: "#ffffff", // Color del fondo del QR
  correctLevel: QRCode.CorrectLevel.H // Nivel de corrección de errores (H = alto)
});