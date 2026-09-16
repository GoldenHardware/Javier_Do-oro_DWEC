console.log("¡Hola DWEC! Mi taller ya funciona.");

const themeToggle = document.getElementById("themeToggle");
const contadorBtn = document.getElementById("contadorBtn");
const contador = document.getElementById("contador");
let cuenta = 0;

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");
    themeToggle.textContent = isLightMode ? "Modo oscuro" : "Modo claro";
  });
}

if (contadorBtn && contador) {
  contadorBtn.addEventListener("click", () => {
    cuenta++;
    contador.textContent = cuenta;
  });
}