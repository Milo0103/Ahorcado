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
  "saudade",
  "sentir",
  "silencio",
  "​​singularidades",
  "sublime",
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
let sobrantes = document.querySelector(".letrasUsadas");
let rondas = 0;
let rondasBuenas = 0;
// ############ DESCUBRIR PALABRA ############# \\
document.querySelector("#check").addEventListener("click", function () {
  rayasEspacio.textContent = "";
  for (let i = 0; i < palabraSeparada.length; i++) {
    if (input.value == palabraSeparada[i]) {
      rayas[i] = palabraSeparada[i];
    } else if (rayas[i] == palabraSeparada[i]) {
      continue;
    } else {
      rayas[i] = " _";
    }
  }
  for (let i = 0; i < palabraSecreta.length; i++) {
    rayasEspacio.textContent += rayas[i];
  }
  // ################################################################
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
  // #################################################################
  let win = 0;
  for (let i = 0; i < palabraSecreta.length; i++) {
    if (rayas[i] == palabraSeparada[i]) {
      win++;
    }
  }

  // ############## LETRAS USADAS ############### \\
  if (!input.value == "") {
    sobrantes.textContent += `${input.value}, `;
  }
  // ############# SCORES Y GANAR ############### \\
  scoretxt.textContent = score;
  if (score == 0) {
    document.documentElement.style.setProperty("--Bg-color", "#de3d3d");
    input.style.visibility = "hidden";
    document.querySelector("#check").style.visibility = "hidden";
    document.querySelector("#again").style.visibility = "visible";
    document.querySelector(".letrero").textContent = "💥YOU LOSE💥";
  }
  if (palabraSeparada.length == win) {
    if (score > high) {
      high = score;
    }
    highscoretxt.textContent = high;
    document.documentElement.style.setProperty("--Bg-color", "#4f9e37");
    input.style.visibility = "hidden";
    document.querySelector("#check").style.visibility = "hidden";
    document.querySelector("#again").style.visibility = "visible";
    document.querySelector(".letrero").textContent = "🎉YOU WIN🎉";
  }
  input.value = "";
});
// ############### REINICIAR JUEGO ############## \\
document.querySelector("#again").addEventListener("click", function () {
  document.documentElement.style.setProperty("--Bg-color", "#1d1d1d");
  palabraSecreta =
    palabras[Math.trunc(Math.random() * (palabras.length + 1) - 1)]; //sacar palabra secreta
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
  sobrantes.textContent = "";
  document.querySelector(".letrero").textContent = "";
});
