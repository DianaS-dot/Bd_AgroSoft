import { useState } from "react";
import { login } from "../services/authService";

function Login({ irARegistro, loginExitoso }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setCargando(true);

    try {
      const data = await login(correo, password);

      console.log("Login exitoso:", data);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      if (data.usuario) {
        localStorage.setItem(
          "usuario",
          JSON.stringify(data.usuario)
        );
      }

      setMensaje("Inicio de sesión exitoso ✅");

      if (typeof loginExitoso === "function") {
        loginExitoso();
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      const mensajeError =
        error.response?.data?.message ||
        "Correo o contraseña incorrectos";

      setMensaje(
        Array.isArray(mensajeError)
          ? mensajeError.join(", ")
          : mensajeError
      );

    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f9f7] lg:flex">

      {/* ================================================= */}
      {/* PARTE IZQUIERDA */}
      {/* ================================================= */}

      <div
        className="relative hidden min-h-screen overflow-hidden lg:flex lg:w-1/2"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Filtro verde */}
        <div className="absolute inset-0 bg-[#185b3b]/85" />

        {/* Contenido */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-10 text-center text-white">

          {/* Logo */}
          <div className="mb-7 flex items-center gap-4">

            <div className="flex h-60px w-60px items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <HojaIcono />
            </div>

            <h1 className="text-[34px] font-bold tracking-tight">
              AGROSOFT
            </h1>

          </div>

          {/* Subtítulo */}
          <h2 className="mb-3 text-[24px] font-bold">
            Gestión de finca
          </h2>

          <p className="max-w-440px text-[18px] leading-7 text-white/90">
            Optimiza tus cultivos y administra tu tierra de
            forma inteligente.
          </p>

        </div>
      </div>


      {/* ================================================= */}
      {/* PARTE DERECHA */}
      {/* ================================================= */}

      <div className="flex min-h-screen w-full items-center justify-center bg-[#f8faf8] px-6 py-10 lg:w-1/2">

        <div className="w-full max-w-500px">

          {/* TÍTULO */}

          <div className="mb-11">

            <h1 className="text-[34px] font-bold leading-tight text-[#175b38]">
              Bienvenido a AgroSoft
            </h1>

            <p className="mt-4 text-[18px] text-[#72a486]">
              Ingresa tus datos para acceder a tu cuenta.
            </p>

          </div>


          {/* FORMULARIO */}

          <form onSubmit={handleSubmit}>

            {/* CORREO */}

            <div className="mb-6">

              <label
                htmlFor="correo"
                className="mb-2 block text-[16px] font-semibold text-[#173b2a]"
              >
                Correo electrónico
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a0b0]">
                  <CorreoIcono />
                </span>

                <input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@gmail.com"
                  required
                  disabled={cargando}
                  className="
                    h-51px
                    w-full
                    rounded-xl
                    border
                    border-[#cfe1d6]
                    bg-[#edf3ff]
                    pl-12
                    pr-4
                    text-[16px]
                    text-[#173b2a]
                    outline-none
                    transition
                    placeholder:text-[#7f8b99]
                    focus:border-[#16813f]
                    focus:ring-2
                    focus:ring-[#16813f]/20
                    disabled:opacity-70
                  "
                />

              </div>

            </div>


            {/* CONTRASEÑA */}

            <div className="mb-5">

              <label
                htmlFor="password"
                className="mb-2 block text-[16px] font-semibold text-[#173b2a]"
              >
                Contraseña
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a0b0]">
                  <CandadoIcono />
                </span>

                <input
                  id="password"
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={cargando}
                  className="
                    h-51px
                    w-full
                    rounded-xl
                    border
                    border-[#cfe1d6]
                    bg-white
                    pl-12
                    pr-14
                    text-[16px]
                    text-[#173b2a]
                    outline-none
                    transition
                    placeholder:text-[#8995a5]
                    focus:border-[#16813f]
                    focus:ring-2
                    focus:ring-[#16813f]/20
                    disabled:opacity-70
                  "
                />

                {/* OJO */}

                <button
                  type="button"
                  onClick={() =>
                    setMostrarPassword(!mostrarPassword)
                  }
                  disabled={cargando}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#69a17a]
                    transition
                    hover:text-[#126b38]
                  "
                  aria-label={
                    mostrarPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  <OjoIcono />
                </button>

              </div>

            </div>


            {/* RECORDAR + OLVIDASTE */}

            <div className="mb-8 flex items-center justify-between">

              <label className="flex cursor-pointer items-center gap-3 text-[16px] text-[#405449]">

                <input
                  type="checkbox"
                  className="
                    h-5
                    w-5
                    rounded
                    border-[#b7c8bd]
                    accent-[#16813f]
                  "
                />

                Recordarme

              </label>


              <button
                type="button"
                className="
                  text-[16px]
                  font-semibold
                  text-[#16813f]
                  transition
                  hover:text-[#0d5d2c]
                "
              >
                ¿Olvidaste tu contraseña?
              </button>

            </div>


            {/* MENSAJE */}

            {mensaje && (
              <div
                className={`mb-5 rounded-xl px-4 py-3 text-center text-sm font-semibold ${
                  mensaje.includes("exitoso")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {mensaje}
              </div>
            )}


            {/* BOTÓN */}

            <button
              type="submit"
              disabled={cargando}
              className="
                h-[56px]
                w-full
                rounded-xl
                bg-[#115b32]
                text-[16px]
                font-bold
                text-white
                shadow-sm
                transition
                duration-200
                hover:bg-[#0d4928]
                disabled:cursor-not-allowed
                disabled:bg-[#7aaa8d]
              "
            >
              {cargando
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </button>

          </form>


          {/* CREAR CUENTA */}

          <div className="mt-6 text-center text-[16px] text-[#75877c]">

            ¿No tienes una cuenta?{" "}

            <button
              type="button"
              onClick={irARegistro}
              className="
                font-bold
                text-[#16813f]
                transition
                hover:text-[#0e5d2d]
              "
            >
              Crear cuenta
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ================================================= */
/* ICONOS */
/* ================================================= */

function HojaIcono() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 11-7 10-16Z" />
      <path d="M5 20c3-5 6-8 11-11" />
    </svg>
  );
}


function CorreoIcono() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}


function CandadoIcono() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}


function OjoIcono() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}


export default Login;