// ==== Configuración ====
// Cambia esta URL por la de tu módulo "usuarios" en NestJS
const API_URL = "http://localhost:3000/api/usuarios";

// ==== Referencias al DOM ====
const form = document.getElementById("form-usuario");
const idInput = document.getElementById("id");
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const rolInput = document.getElementById("rol");
const tabla = document.getElementById("tabla-usuarios");
const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");

// ==== READ: obtener todos los usuarios ====
async function obtenerTodos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    const datos = await res.json();
    renderTabla(datos);
  } catch (error) {
    console.error(error);
    alert("No se pudo conectar con la API. Revisa la URL y que el backend esté corriendo.");
  }
}

// ==== Renderizar filas de la tabla ====
function renderTabla(datos) {
  tabla.innerHTML = "";
  datos.forEach((usuario) => {
    const fila = document.createElement("tr");
    fila.className = "border-b hover:bg-gray-50";
    fila.innerHTML = `
      <td class="p-2">${usuario.nombre}</td>
      <td class="p-2">${usuario.email}</td>
      <td class="p-2">${usuario.rol ?? ""}</td>
      <td class="p-2 flex gap-2">
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm btn-editar"
          data-id="${usuario.id}"
        >
          Editar
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm btn-eliminar"
          data-id="${usuario.id}"
        >
          Eliminar
        </button>
      </td>
    `;
    tabla.appendChild(fila);
  });

  // Enlazar eventos de los botones recién creados
  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => cargarParaEditar(btn.dataset.id, datos));
  });
  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", () => eliminar(btn.dataset.id));
  });
}

// ==== CREATE / UPDATE: guardar (según haya id o no) ====
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = {
    nombre: nombreInput.value,
    email: emailInput.value,
    rol: rolInput.value,
  };

  try {
    if (idInput.value) {
      // UPDATE
      const res = await fetch(`${API_URL}/${idInput.value}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      if (!res.ok) throw new Error("Error al actualizar usuario");
    } else {
      // CREATE
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      if (!res.ok) throw new Error("Error al crear usuario");
    }

    resetFormulario();
    obtenerTodos();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al guardar el usuario.");
  }
});

// ==== Cargar datos en el formulario para editar ====
function cargarParaEditar(id, datos) {
  const usuario = datos.find((u) => String(u.id) === String(id));
  if (!usuario) return;

  idInput.value = usuario.id;
  nombreInput.value = usuario.nombre;
  emailInput.value = usuario.email;
  rolInput.value = usuario.rol ?? "";

  btnGuardar.textContent = "Actualizar";
  btnCancelar.classList.remove("hidden");
}

// ==== Cancelar edición ====
btnCancelar.addEventListener("click", resetFormulario);

function resetFormulario() {
  form.reset();
  idInput.value = "";
  btnGuardar.textContent = "Guardar";
  btnCancelar.classList.add("hidden");
}

// ==== DELETE: eliminar usuario ====
async function eliminar(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar este usuario?");
  if (!confirmar) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar usuario");
    obtenerTodos();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al eliminar el usuario.");
  }
}

// ==== Carga inicial ====
document.addEventListener("DOMContentLoaded", obtenerTodos);
