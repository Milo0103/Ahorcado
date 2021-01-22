"use strict";

// ############ PALABRA SECRETA ############### \\
const palabras = [
  "adiós",
  "adorable",
  "alumbración",
  "amistad",
  "amor",
  "caminos",
  "lluvia",
  "coraje",
  "cuidar",
  "cumplicidad",
  "efímero",
  "equilibrio",
  "encanto",
  "enternecer",
  "epifanía",
  "esperanza",
  "felicidad",
  "gentileza",
  "guerra",
  "honestidad",
  "honor",
  "imprescindible",
  "inexorable",
  "infinito",
  "libertad",
  "madre",
  "mareas",
  "melancolia",
  "memoria",
  "metáfora",
  "nación",
  "nacimiento",
  "palabras",
  "padre",
  "paz",
  "perfectamente",
  "primavera",
  "reciprocidad",
  "reanudar",
  "renacer",
  "resiliencia",
  "respeto",
  "risas",
  "sentir",
  "silencio",
  "​​singularidad",
  "sublime",
  "sufrimiento",
  "ternura",
  "tertulia",
  "vida",
];
let palabraSecreta =
  palabras[Math.trunc(Math.random() * (palabras.length + 1) - 1)]; //sacar palabra secreta
palabraSecreta = palabraSecreta
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");
let rayasEspacio = document.querySelector(".rayas");
let rayas = [];
for (let i = 0; i < palabraSecreta.length; i++) {
  rayas.push(" _"); //poner las lineas necesarias
}
for (let i = 0; i < palabraSecreta.length; i++) {
  rayasEspacio.textContent += rayas[i];
}

let palabraSeparada = [];
let ii = 1;
for (let i = 0; i < palabraSecreta.length; i++) {
  //separa las letras de las plabras
  palabraSeparada.push(palabraSecreta.slice(i, ii));
  ii += 1;
}

// ############### VARIABLES ################# \\
let score = 20;
let high = 0;
let scoretxt = document.querySelector(".now");
let highscoretxt = document.querySelector(".high");
let input = document.querySelector(".input");
let sobrantestxt = document.querySelector(".letrasUsadas");
let sobrantesArray = [];
let alerta = document.querySelector(".alertas");
let rondas = 0;
let rondasBuenas = 0;
let Completarlenght;
let interruptorCompletar = false;
if (palabraSecreta.length > 10) {
  Completarlenght = palabraSecreta.length - 2.5 + "em";
} else {
  Completarlenght = palabraSecreta.length - 0.5 + "em";
}
// ############# DESCUBRIR PALABRA ############# \\
document.querySelector("#check").addEventListener("click", function () {
  let win = 0;
  if (input.value == palabraSecreta) {
    win = palabraSeparada.length;
    score++;
  }
  if (interruptorCompletar) {
    input.animate([{ width: "50px" }], {
      duration: 1000,
      iterations: 1,
      fill: "forwards",
    });
    document.querySelector("#completa").style.visibility = "visible";
    input.maxLength = "1";
    input.style.fontSize = "1.7em";
    input.style.marginLeft = "30px";
  }
  alerta.textContent = "";
  rayasEspacio.textContent = "";
  for (let i = 0; i < palabraSeparada.length; i++) {
    if (input.value == palabraSeparada[i]) {
      rayas[i] = palabraSeparada[i];
      document.querySelector("#completa").style.visibility = "visible";
    } else if (rayas[i] == palabraSeparada[i]) {
      continue;
    } else {
      rayas[i] = " _";
    }
  }
  for (let i = 0; i < palabraSecreta.length; i++) {
    rayasEspacio.textContent += rayas[i];
  }

  for (let i = 0; i < palabraSecreta.length; i++) {
    for (let b = 0; b < palabraSeparada.length; b++) {
      if (rayas[b] == palabraSeparada[b] && rayas[b] == input.value) {
        rondas++;
      }
    }

    if (rayas[i] == " _" && !input.value == "" && rondas == rondasBuenas) {
      score--;
      break;
    }
  }
  rondasBuenas = rondas;

  for (let i = 0; i < palabraSecreta.length; i++) {
    if (rayas[i] == palabraSeparada[i]) {
      win++;
    }
  }
  // ############## LETRAS USADAS ############### \\
  if (!input.value == "" && input.value.length < 2) {
    let rondasDeSobrantes = 0;
    let quienSabe;
    for (let i = 0; i < sobrantesArray.length; i++) {
      if (input.value == sobrantesArray[i]) {
        quienSabe = true;
        break;
      } else {
        quienSabe = false;
      }
    }
    if (quienSabe) {
      rondasDeSobrantes++;
    } else {
      sobrantesArray.push(input.value);
    }
    if (rondasDeSobrantes > 0) {
      alerta.textContent = "😅Revisa las letras usadas😅";
    }
    sobrantestxt.textContent += ` ${input.value}, `;
  }
  // ############# SCORES Y GANAR ############### \\
  scoretxt.textContent = score;
  if (score == 0) {
    document.documentElement.style.setProperty("--Bg-color", "#de3d3d");
    input.style.visibility = "hidden";
    document.querySelector("#check").style.visibility = "hidden";
    document.querySelector("#again").style.visibility = "visible";
    document.querySelector(".letrero").textContent = "💥PERDISTE💥";
    document.querySelector("#completa").style.visibility = "hidden";
    rayasEspacio.textContent = palabraSecreta;
  }
  if (palabraSeparada.length <= win) {
    if (score > high) {
      high = score;
    }
    highscoretxt.textContent = high;
    document.documentElement.style.setProperty("--Bg-color", "#4f9e37");
    input.style.visibility = "hidden";
    document.querySelector("#check").style.visibility = "hidden";
    document.querySelector("#again").style.visibility = "visible";
    document.querySelector(".letrero").textContent = "🎉GANASTE🎉";
    document.querySelector("#completa").style.visibility = "hidden";
    rayasEspacio.textContent = palabraSecreta;
  }
  input.value = "";
});
// ############# COMPLETAR PALABRA ############# \\
document.querySelector("#completa").addEventListener("click", function () {
  input.animate([{ width: Completarlenght }], {
    duration: 1000,
    iterations: 1,
    fill: "forwards",
  });
  document.querySelector("#completa").style.visibility = "hidden";
  input.maxLength = palabraSecreta.length;
  interruptorCompletar = true;
  input.style.fontSize = "1.3em";
  input.style.marginLeft = "10px";
  input.style.marginRight = "10px";
});
// ############## REINICIAR JUEGO ############## \\
document.querySelector("#again").addEventListener("click", function () {
  document.documentElement.style.setProperty("--Bg-color", "#1d1d1d");
  palabraSecreta =
    palabras[Math.trunc(Math.random() * (palabras.length + 1) - 1)]; //sacar palabra secreta
  palabraSecreta = palabraSecreta
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  rayas = [];
  rayasEspacio.textContent = "";
  for (let i = 0; i < palabraSecreta.length; i++) {
    rayas.push(" _"); //poner las lineas necesarias
  }
  for (let i = 0; i < palabraSecreta.length; i++) {
    rayasEspacio.textContent += rayas[i];
  }

  palabraSeparada = [];
  ii = 1;
  for (let i = 0; i < palabraSecreta.length; i++) {
    //separa las letras de las plabras
    palabraSeparada.push(palabraSecreta.slice(i, ii));
    ii += 1;
  }
  score = 20;
  rondas = 0;
  rondasBuenas = 0;
  scoretxt.textContent = score;
  input.style.visibility = "visible";
  document.querySelector("#check").style.visibility = "visible";
  document.querySelector("#again").style.visibility = "hidden";
  sobrantestxt.textContent = "";
  sobrantesArray = [];
  alerta.textContent = "";
  document.querySelector(".letrero").textContent = "";
});
