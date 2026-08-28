
import { useState } from "react";
import axios from "axios";

export default function CrearCuenta({ volverLogin }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    idFicha: "",
    programaFormacionId: "",
    telefono: "",
    correo: "",
    password: "",
    confirmarPassword: "",
    rolId: "",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // =========================
  // CAMBIAR CAMPOS
  // =========================
  const cambiarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Quitar mensajes cuando el usuario empiece a corregir
    setError("");
    setMensaje("");
  };

  // =========================
  // CREAR CUENTA
  // =========================
  const crearCuenta = async (e) => {
    e.preventDefault();

    setError("");
    setMensaje("");

    // =========================
    // VALIDACIONES FRONTEND
    // =========================

    // Validar contraseñas
    if (formulario.password !== formulario.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validar longitud de contraseña
    if (formulario.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    // Validar ID de ficha
    if (!formulario.idFicha.trim()) {
      setError("El ID de ficha es obligatorio");
      return;
    }

    if (formulario.idFicha.length > 20) {
      setError("El ID de ficha no puede tener más de 20 caracteres");
      return;
    }

    // Validar programa
    if (!formulario.programaFormacionId) {
      setError("Debes ingresar el ID del programa de formación");
      return;
    }

    // Validar rol
    if (!formulario.rolId) {
      setError("Debes ingresar el ID del rol");
      return;
    }

    setCargando(true);

    try {
      // =========================
      // DATOS PARA EL BACKEND
      // =========================
      const datos = {
        nombre: formulario.nombre.trim(),
        apellido: formulario.apellido.trim(),
        identificacion: formulario.identificacion.trim(),

        // IMPORTANTE:
        // idFicha debe ser STRING
        idFicha: formulario.idFicha.trim(),

        // Estos sí son números
        programaFormacionId: Number(formulario.programaFormacionId),

        telefono: formulario.telefono.trim(),
        correo: formulario.correo.trim(),

        password: formulario.password,

        // Rol como número
        rolId: Number(formulario.rolId),

        // Usuario nuevo activo
        estado: "ACTIVO",
      };

      console.log("Datos enviados al backend:", datos);

      // =========================
      // PETICIÓN POST
      // =========================
      const respuesta = await axios.post(
        "http://localhost:3000/usuarios",
        datos
      );

      console.log("Usuario creado:", respuesta.data);

      // =========================
      // MENSAJE DE ÉXITO
      // =========================
      setMensaje(
        "Cuenta creada correctamente. Ya puedes iniciar sesión."
      );

      // =========================
      // LIMPIAR FORMULARIO
      // =========================
      setFormulario({
        nombre: "",
        apellido: "",
        identificacion: "",
        idFicha: "",
        programaFormacionId: "",
        telefono: "",
        correo: "",
        password: "",
        confirmarPassword: "",
        rolId: "",
      });
    } catch (error) {
      console.error("Error creando usuario:", error);

      const mensajeBackend = error.response?.data?.message;

      if (Array.isArray(mensajeBackend)) {
        setError(mensajeBackend.join(", "));
      } else if (mensajeBackend) {
        setError(mensajeBackend);
      } else {
        setError("No se pudo crear la cuenta");
      }
    } finally {
      setCargando(false);
    }
  };

  // =========================
  // DISEÑO
  // =========================
  return (
    <div className="min-h-screen bg-[#f5f7f5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">

        {/* =========================
            ENCABEZADO
        ========================= */}
        <div className="mb-6 text-center">

          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#dcefe3]">
            <span className="text-4xl">
              🌱
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#173b2a]">
            Crear cuenta
          </h1>

          <p className="mt-2 text-sm text-[#789184]">
            Regístrate para comenzar a utilizar AgroSoft
          </p>

        </div>

        {/* =========================
            FORMULARIO
        ========================= */}
        <div className="rounded-2xl border border-[#dce6df] bg-white p-6 md:p-8 shadow-lg">

          <form onSubmit={crearCuenta}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* =========================
                  NOMBRE
              ========================= */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={cambiarCampo}
                  placeholder="Tu nombre"
                  required
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />
              </div>

              {/* =========================
                  APELLIDO
              ========================= */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Apellido
                </label>

                <input
                  type="text"
                  name="apellido"
                  value={formulario.apellido}
                  onChange={cambiarCampo}
                  placeholder="Tu apellido"
                  required
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />
              </div>

              {/* =========================
                  IDENTIFICACIÓN
              ========================= */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Identificación
                </label>

                <input
                  type="text"
                  name="identificacion"
                  value={formulario.identificacion}
                  onChange={cambiarCampo}
                  placeholder="Número de identificación"
                  required
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />
              </div>

              {/* =========================
                  ID FICHA
              ========================= */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  ID de ficha
                </label>

                <input
                  type="text"
                  name="idFicha"
                  value={formulario.idFicha}
                  onChange={cambiarCampo}
                  placeholder="Ej: 1234567"
                  required
                  maxLength={20}
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />

                <p className="mt-1 text-xs text-[#789184]">
                  Máximo 20 caracteres
                </p>
              </div>

              {/* =========================
                  PROGRAMA
              ========================= */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Programa de formación
                </label>

                <input
                  type="number"
                  name="programaFormacionId"
                  value={formulario.programaFormacionId}
                  onChange={cambiarCampo}
                  placeholder="ID del programa"
                  required
                  min="1"
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />
              </div>

              {/* =========================
                  TELÉFONO
              ========================= */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Teléfono
                </label>

                <input
                  type="tel"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={cambiarCampo}
                  placeholder="300 000 0000"
                  required
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />
              </div>

              {/* =========================
                  CORREO
              ========================= */}
              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  name="correo"
                  value={formulario.correo}
                  onChange={cambiarCampo}
                  placeholder="ejemplo@gmail.com"
                  required
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />

              </div>

              {/* =========================
                  CONTRASEÑA
              ========================= */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Contraseña
                </label>

                <input
                  type="password"
                  name="password"
                  value={formulario.password}
                  onChange={cambiarCampo}
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />

                <p className="mt-1 text-xs text-[#789184]">
                  Mínimo 8 caracteres
                </p>

              </div>

              {/* =========================
                  CONFIRMAR CONTRASEÑA
              ========================= */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Confirmar contraseña
                </label>

                <input
                  type="password"
                  name="confirmarPassword"
                  value={formulario.confirmarPassword}
                  onChange={cambiarCampo}
                  placeholder="Repite tu contraseña"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />

              </div>

              {/* =========================
                  ROL
              ========================= */}
              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                  Rol
                </label>

                <input
                  type="number"
                  name="rolId"
                  value={formulario.rolId}
                  onChange={cambiarCampo}
                  placeholder="ID del rol"
                  required
                  min="1"
                  className="w-full rounded-xl border border-[#dce6df] px-4 py-3 text-sm outline-none focus:border-[#4f9d69] focus:ring-2 focus:ring-[#dcefe3]"
                />

              </div>

            </div>

            {/* =========================
                ERROR
            ========================= */}
            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* =========================
                ÉXITO
            ========================= */}
            {mensaje && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
                {mensaje}
              </div>
            )}

            {/* =========================
                BOTÓN
            ========================= */}
            <button
              type="submit"
              disabled={cargando}
              className="mt-6 w-full rounded-xl bg-[#4f9d69] py-3 font-bold text-white transition hover:bg-[#3f8156] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cargando
                ? "Creando cuenta..."
                : "Crear cuenta"}
            </button>

          </form>

          {/* =========================
              VOLVER AL LOGIN
          ========================= */}
          <div className="mt-6 text-center">

            <button
              type="button"
              onClick={volverLogin}
              className="text-sm font-semibold text-[#4f9d69] hover:text-[#173b2a]"
            >
              ← Volver al inicio de sesión
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

