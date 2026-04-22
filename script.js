document.addEventListener("DOMContentLoaded", function () {

  console.log("JS CARGADO ");

  // ==========================
  // SELECTORES
  // ==========================
  const btn = document.getElementById("btn");
  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");

  const total = document.getElementById("total");
  const pending = document.getElementById("pending");
  const completed = document.getElementById("completed");

  // VALIDACIÓN FUERTE
  if (!btn || !input || !list) {
    alert("ERROR: IDs mal conectados");
    console.error("No se encontraron elementos:", { btn, input, list });
    return;
  }

  let tasks = [];

  // ==========================
// LÓGICA DEL MENÚ DESPLEGABLE
// ==========================
const toggleMovies = document.getElementById("toggleMovies");
const movieSubmenu = document.getElementById("movieSubmenu");

if (toggleMovies && movieSubmenu) {
  toggleMovies.onclick = function() {
    // Alterna la clase "open" para que el CSS haga la magia
    movieSubmenu.classList.toggle("open");
  };
}

  // ==========================
  // BOTÓN AGREGAR
  // ==========================
  btn.onclick = function () {

    console.log("CLICK DETECTADO ");

    const text = input.value.trim();

    if (text === "") {
      alert("Escribe una tarea");
      return;
    }

    tasks.push({ text: text, done: false });

    input.value = "";

    render();
  };

  // ==========================
  // RENDER
  // ==========================
  function render() {

    list.innerHTML = "";

    tasks.forEach((task, index) => {

      const div = document.createElement("div");
      div.className = "task";

      if (task.done) div.classList.add("completed");

      div.innerHTML = `
        <span>${task.text}</span>
        <div class="actions">
          <button data-action="complete">✔</button>
          <button data-action="delete">🗑</button>
        </div>
      `;

      list.appendChild(div);
    });

    updateStats();
  }

  // ==========================
  // EVENTOS DELEGADOS (CLAVE)
  // ==========================
  list.addEventListener("click", function (e) {

    const action = e.target.getAttribute("data-action");

    if (!action) return;

    const item = e.target.closest(".task");
    const index = Array.from(list.children).indexOf(item);

    if (action === "complete") {
      tasks[index].done = !tasks[index].done;
      render();
    }

    if (action === "delete") {
      tasks.splice(index, 1);
      render();
    }
  });

  // ==========================
  // STATS
  // ==========================
  function updateStats() {
    total.textContent = tasks.length;

    const done = tasks.filter(t => t.done).length;

    completed.textContent = done;
    pending.textContent = tasks.length - done;
  }

});