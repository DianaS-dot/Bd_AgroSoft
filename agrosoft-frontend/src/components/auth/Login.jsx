import { useState } from "react";
import { login } from "../services/authService";

function Login({ irARegistro, loginExitoso }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setCargando(true);

    try {
      const data = await login(correo, password);

      console.log("Login exitoso:", data);

      // Guardar JWT
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      // Guardar información del usuario
      if (data.usuario) {
        localStorage.setItem(
          "usuario",
          JSON.stringify(data.usuario)
        );
      }

      setMensaje("Inicio de sesión exitoso ✅");

      // Avisar a App.jsx que el login fue exitoso
      if (loginExitoso) {
        loginExitoso();
      }

    } catch (error) {
      console.error("Error en login:", error);

      setMensaje(
        error.response?.data?.message ||
        "Correo o contraseña incorrectos"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f5f7f5]">

      {/* =====================================================
          LADO IZQUIERDO
      ====================================================== */}
      <div
        className="
          hidden
          lg:flex
          lg:w-1/2
          relative
          min-h-screen
          items-center
          justify-center
          overflow-hidden
        "
        style={{
          backgroundImage:
            "url('/images/cultivo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Capa verde sobre la imagen */}
        <div className="absolute inset-0 bg-[#0d5c35]/90"></div>

        {/* Contenido */}
        <div className="relative z-10 text-center text-white px-10 max-w-xl">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div
              className="
                w-16
                h-16
                rounded-xl
                bg-white/15
                backdrop-blur-sm
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              {/* Icono hoja */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 3c-4.5.3-8.2 1.5-10.8 4.1C6.4 9.9 6 14 6 17c3 0 7.1-.4 9.9-3.2C18.5 11.2 19.7 7.5 20 3Z" />
                <path d="M4 21c2.5-4.5 5.5-7.5 10-10" />
              </svg>
            </div>
          </div>

          {/* Nombre */}
          <h1 className="text-4xl font-bold tracking-tight">
            AGROSOFT
          </h1>

          {/* Subtítulo */}
          <h2 className="text-2xl font-semibold mt-7">
            Gestión de finca
          </h2>

          <p className="text-lg text-white/85 mt-4 leading-relaxed">
            Optimiza tus cultivos y administra tu tierra de
            <br />
            forma inteligente.
          </p>

        </div>
      </div>


      {/* =====================================================
          LADO DERECHO
      ====================================================== */}
      <div
        className="
          w-full
          lg:w-1/2
          min-h-screen
          flex
          items-center
          justify-center
          px-6
          sm:px-10
          lg:px-16
          xl:px-24
        "
      >

        <div className="w-full max-w-[500px">

          {/* Título */}
          <div className="mb-11">

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-[#0c5b34]
                tracking-tight
              "
            >
              Bienvenido a AgroSoft
            </h1>

            <p className="text-[#6b7280] text-base sm:text-lg mt-3">
              Ingresa tus datos para acceder a tu cuenta.
            </p>

          </div>


          {/* =================================================
              FORMULARIO
          ================================================== */}
          <form onSubmit={handleSubmit}>

            {/* Correo */}
            <div className="mb-6">

              <label
                htmlFor="correo"
                className="
                  block
                  text-[16px]
                  font-semibold
                  text-[#263238]
                  mb-2
                "
              >
                Correo electrónico
              </label>

              <div className="relative">

                {/* Icono correo */}
                <div
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#9aa5b1]
                    pointer-events-none
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="20"
                      height="16"
                      x="2"
                      y="4"
                      rx="2"
                    />
                    <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>

                <input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="admin@agrosoft.com"
                  required
                  className="
                    w-full
                    h-52px
                    pl-12
                    pr-4
                    rounded-[10px]
                    border
                    border-[#cbded3]
                    bg-white
                    text-[#263238]
                    placeholder:text-[#9ca3af]
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#248b55]
                    focus:ring-2
                    focus:ring-[#248b55]/15
                  "
                />

              </div>
            </div>


            {/* Contraseña */}
            <div className="mb-4">

              <label
                htmlFor="password"
                className="
                  block
                  text-[16px]
                  font-semibold
                  text-[#263238]
                  mb-2
                "
              >
                Contraseña
              </label>

              <div className="relative">

                {/* Icono candado */}
                <div
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#9aa5b1]
                    pointer-events-none
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="10"
                      rx="2"
                    />
                    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                  </svg>
                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  className="
                    w-full
                    pl-12
                    pr-12
                    rounded-[10px]
                    border
                    border-[#cbded3]
                    bg-white
                    text-[#263238]
                    placeholder:text-[#9ca3af]
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#248b55]
                    focus:ring-2
                    focus:ring-[#248b55]/15
                  "
                />

                {/* Icono ojo */}
                <button
                  type="button"
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#68a77d]
                    hover:text-[#0c5b34]
                    transition
                  "
                  aria-label="Mostrar contraseña"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>

              </div>
            </div>


            {/* Recordarme + recuperar contraseña */}
            <div
              className="
                flex
                items-center
                justify-between
                mb-8
                gap-4
              "
            >

              {/* Recordarme */}
              <label
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                  text-[#4b5563]
                "
              >

                <input
                  type="checkbox"
                  className="
                    w-5
                    h-5
                    rounded
                    border-[#aab7b0]
                    text-[#0c5b34]
                    focus:ring-[#248b55]
                    cursor-pointer
                  "
                />

                <span className="text-[16px]">
                  Recordarme
                </span>

              </label>


              {/* Recuperar contraseña */}
              <button
                type="button"
                className="
                  text-[15px]
                  sm:text-[16px]
                  font-semibold
                  text-[#149447]
                  hover:text-[#0c5b34]
                  transition
                  whitespace-nowrap
                "
              >
                ¿Olvidaste tu contraseña?
              </button>

            </div>


            {/* Botón iniciar sesión */}
            <button
              type="submit"
              disabled={cargando}
              className="
                w-full
                h-56px
                bg-[#0c5b34]
                hover:bg-[#084b2a]
                disabled:bg-[#83b59a]
                text-white
                font-bold
                text-[16px]
                rounded-[10px]
                transition-all
                duration-200
                shadow-sm
                hover:shadow-md
              "
            >
              {cargando
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </button>

          </form>


          {/* =================================================
              MENSAJE
          ================================================== */}
          {mensaje && (
            <div
              className={`
                mt-5
                text-center
                font-semibold
                text-sm
                ${
                  mensaje.includes("exitoso")
                    ? "text-green-600"
                    : "text-red-500"
                }
              `}
            >
              {mensaje}
            </div>
          )}


          {/* =================================================
              CREAR CUENTA
          ================================================== */}
          <p className="text-center text-[#737b83] mt-6 text-[16px]">

            ¿No tienes una cuenta?{" "}

            <button
              type="button"
              onClick={irARegistro}
              className="
                text-[#149447]
                font-bold
                hover:text-[#0c5b34]
                transition
              "
            >
              Crear cuenta
            </button>

          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
