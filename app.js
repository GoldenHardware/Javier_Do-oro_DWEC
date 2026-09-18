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

/* Fase 3: mover los datos al JavaScript y rellenar la tabla dinámicamente */
const juegos = [
  { nombre: 'The Legend of Zelda: Tears of the Kingdom', compania: 'Nintendo', plataforma: 'Nintendo Switch', valoracion: '9.8 / 10', precio: '69.99 €' },
  { nombre: 'Elden Ring', compania: 'FromSoftware', plataforma: 'PS5', valoracion: '9.5 / 10', precio: '59.99 €' },
  { nombre: 'God of War Ragnarök', compania: 'Santa Monica Studio (Sony)', plataforma: 'PS5', valoracion: '9.4 / 10', precio: '69.99 €' },
  { nombre: 'Cyberpunk 2077', compania: 'CD Projekt Red', plataforma: 'PC', valoracion: '8.2 / 10', precio: '49.99 €' },
  { nombre: 'Minecraft', compania: 'Mojang Studios', plataforma: 'Multiplataforma', valoracion: '9.0 / 10', precio: '26.95 €' }
];

function populateTable() {
  const tbody = document.querySelector('#tablaJuegos tbody');
  if (!tbody) return;
  // Vaciar por si quedaba contenido
  tbody.innerHTML = '';
  juegos.forEach(j => {
    const tr = document.createElement('tr');
    const cols = ['nombre', 'compania', 'plataforma', 'valoracion', 'precio'];
    cols.forEach(c => {
      const td = document.createElement('td');
      td.textContent = j[c];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', populateTable);

/* Inicializar partículas interactivas (fondo) */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let particles = [];
  const mouse = { x: null, y: null, radius: Math.max(80, Math.min(160, Math.sqrt(w*h)/12)) };

  function onResize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    // ajustar cantidad según tamaño
    const count = Math.max(30, Math.min(120, Math.floor((w * h) / 90000)));
    while (particles.length < count) particles.push(createParticle());
    while (particles.length > count) particles.pop();
    mouse.radius = Math.max(80, Math.min(160, Math.sqrt(w*h)/12));
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      r: rand(1, 2.4)
    };
  }

  function update() {
    ctx.clearRect(0, 0, w, h);
    // dibujar líneas
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // movimiento
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // interacción con ratón (repel)
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 6;
          p.y += (dy / dist) * force * 6;
        }
      }

      // dibujar partícula
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // líneas entre partículas cercanas
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const pa = particles[a];
        const pb = particles[b];
        const dx = pa.x - pb.x;
        const dy = pa.y - pb.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          const alpha = 0.12 * (1 - dist / 120);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(170,200,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(update);
  }

  // inicializar partículas
  onResize();
  for (let i = 0; i < particles.length; i++); // noop
  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', initParticles);