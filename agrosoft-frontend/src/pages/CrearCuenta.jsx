
import { useState } from "react";
import api from "../api/axios";

// Icono de hoja
function HojaIcono() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-10 w-10 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 3.5C13 3.5 7 5.5 4.5 10c-2 3.5-.5 7.5 3 8.5 4.5 1.5 8-2 9.5-5.5 1.5-3.5 1.5-6.5 3.5-9.5Z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 20c2.5-4.5 6-7 10-8.5"
      />
    </svg>
  );
}

function CrearCuenta({ irALogin }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Cambiar valores del formulario
  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // Crear cuenta
  const crearCuenta = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    // Validar campos
    if (
      !formulario.nombre.trim() ||
      !formulario.apellido.trim() ||
      !formulario.correo.trim() ||
      !formulario.password ||
      !formulario.confirmarPassword
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Validar contraseña
    if (formulario.password !== formulario.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setCargando(true);

      // Enviar datos al backend
      await api.post("/auth/register", {
        nombre: formulario.nombre,
        apellido: formulario.apellido,
        correo: formulario.correo,
        password: formulario.password,
      });

      setMensaje("¡Cuenta creada correctamente!");

      // Limpiar formulario
      setFormulario({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        confirmarPassword: "",
      });

      // Regresar al login
      setTimeout(() => {
        irALogin();
      }, 1500);
    } catch (error) {
      console.error("Error al crear cuenta:", error);

      if (error.response?.data?.message) {
        const mensajeError = error.response.data.message;

        setError(
          Array.isArray(mensajeError)
            ? mensajeError.join(", ")
            : mensajeError
        );
      } else {
        setError("No se pudo crear la cuenta");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">

      <div className="w-full min-h-screen bg-white flex overflow-hidden">

        {/* ================================================= */}
        {/* PARTE IZQUIERDA */}
        {/* ================================================= */}

        <div
          className="relative hidden lg:flex lg:w-1/2 min-h-screen overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Filtro verde */}
          <div className="absolute inset-0 bg-[#185b3b]/85"></div>

          {/* Contenido */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center px-10 text-center text-white">

            {/* Logo */}
            <div className="mb-7 flex items-center gap-4">

              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <HojaIcono />
              </div>

              <h1 className="text-[34px] font-bold tracking-tight">
                AGROSOFT
              </h1>

            </div>

            {/* Título */}
            <h2 className="mb-3 text-[24px] font-bold">
              Gestión de finca
            </h2>

            {/* Descripción */}
            <p className="max-w-[440px] text-[18px] leading-7 text-white/90">
              Optimiza tus cultivos y administra tu tierra de
              forma inteligente.
            </p>

          </div>
        </div>

        {/* ================================================= */}
        {/* PARTE DERECHA - FORMULARIO */}
        {/* ================================================= */}

        <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-white px-6 py-10">

          <div className="w-full max-w-[500px]">

            {/* Encabezado */}
            <div className="text-center mb-8">

              <h2 className="text-3xl font-bold text-gray-800">
                Crear cuenta
              </h2>

              <p className="text-gray-500 mt-2">
                Regístrate para comenzar a usar AgroSoft
              </p>

            </div>

            {/* MENSAJE DE ÉXITO */}
            {mensaje && (
              <div className="mb-5 rounded-xl bg-green-100 border border-green-200 px-4 py-3 text-sm text-green-700 text-center">
                {mensaje}
              </div>
            )}

            {/* MENSAJE DE ERROR */}
            {error && (
              <div className="mb-5 rounded-xl bg-red-100 border border-red-200 px-4 py-3 text-sm text-red-700 text-center">
                {error}
              </div>
            )}

            {/* FORMULARIO */}
            <form onSubmit={crearCuenta} className="space-y-5">

              {/* NOMBRE Y APELLIDO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 outline-none transition focus:border-[#185b3b] focus:ring-2 focus:ring-[#185b3b]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido
                  </label>

                  <input
                    type="text"
                    name="apellido"
                    value={formulario.apellido}
                    onChange={manejarCambio}
                    placeholder="Tu apellido"
                    autoComplete="family-name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 outline-none transition focus:border-[#185b3b] focus:ring-2 focus:ring-[#185b3b]/20"
                  />
                </div>

              </div>

              {/* CORREO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  name="correo"
                  value={formulario.correo}
                  onChange={manejarCambio}
                  placeholder="ejemplo@correo.com"
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 outline-none transition focus:border-[#185b3b] focus:ring-2 focus:ring-[#185b3b]/20"
                />
              </div>

              {/* CONTRASEÑA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>

                <input
                  type="password"
                  name="password"
                  value={formulario.password}
                  onChange={manejarCambio}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 outline-none transition focus:border-[#185b3b] focus:ring-2 focus:ring-[#185b3b]/20"
                />
              </div>

              {/* CONFIRMAR CONTRASEÑA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar contraseña
                </label>

                <input
                  type="password"
                  name="confirmarPassword"
                  value={formulario.confirmarPassword}
                  onChange={manejarCambio}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 outline-none transition focus:border-[#185b3b] focus:ring-2 focus:ring-[#185b3b]/20"
                />
              </div>

              {/* BOTÓN */}
              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-[#185b3b] hover:bg-[#12452d] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
              >
                {cargando ? "Creando cuenta..." : "Crear cuenta"}
              </button>

            </form>

            {/* VOLVER AL LOGIN */}
            <div className="text-center mt-7">

              <p className="text-gray-500 text-sm">
                ¿Ya tienes una cuenta?
              </p>

              <button
                type="button"
                onClick={irALogin}
                className="mt-1 text-[#185b3b] hover:text-[#12452d] font-semibold transition"
              >
                Iniciar sesión
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CrearCuenta;
