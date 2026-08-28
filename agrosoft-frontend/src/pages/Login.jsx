
import { useState } from "react";
import axios from "axios";

export default function Login({ irARegistro }) {  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    try {
      const respuesta = await axios.post(
        "http://localhost:3000/auth/login",
        {
          correo,
          password,
        }
      );

      console.log("Respuesta del backend:", respuesta.data);

      // Guardar JWT
      localStorage.setItem(
        "token",
        respuesta.data.access_token
      );

      // Guardar datos del usuario
      localStorage.setItem(
        "usuario",
        JSON.stringify(respuesta.data.usuario)
      );

      // Volver a cargar App.jsx
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("No se pudo iniciar sesión");
      }

    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f5] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">

          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#dcefe3]">
            <span className="text-4xl">
              🌱
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#173b2a]">
            AgroSoft
          </h1>

          <p className="mt-2 text-sm text-[#789184]">
            Gestión inteligente de tus cultivos
          </p>

        </div>

        {/* TARJETA */}
        <div className="rounded-2xl border border-[#dce6df] bg-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-[#173b2a]">
            Iniciar sesión
          </h2>

          <p className="mt-1 mb-6 text-sm text-[#789184]">
            Ingresa tus datos para continuar
          </p>

          <form onSubmit={iniciarSesion}>

            {/* CORREO */}
            <div className="mb-5">

              <label
                htmlFor="correo"
                className="mb-2 block text-sm font-semibold text-[#173b2a]"
              >
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="ejemplo@gmail.com"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#dce6df]
                  px-4
                  py-3
                  text-sm
                  text-gray-700
                  outline-none
                  transition
                  focus:border-[#4f9d69]
                  focus:ring-2
                  focus:ring-[#dcefe3]
                "
              />

            </div>

            {/* CONTRASEÑA */}
            <div className="mb-3">

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#173b2a]"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#dce6df]
                  px-4
                  py-3
                  text-sm
                  text-gray-700
                  outline-none
                  transition
                  focus:border-[#4f9d69]
                  focus:ring-2
                  focus:ring-[#dcefe3]
                "
              />

            </div>

            {/* RECUPERAR CONTRASEÑA */}
            <div className="mb-6 text-right">

              <button
                type="button"
                className="
                  text-sm
                  font-medium
                  text-[#4f9d69]
                  hover:text-[#173b2a]
                "
              >
                ¿Olvidaste tu contraseña?
              </button>

            </div>

            {/* ERROR */}
            {error && (
              <div className="
                mb-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-center
                text-sm
                font-medium
                text-red-600
              ">
                {error}
              </div>
            )}

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={cargando}
              className="
                w-full
                rounded-xl
                bg-[#4f9d69]
                py-3
                font-bold
                text-white
                transition
                duration-200
                hover:bg-[#3f8156]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {cargando
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </button>

          </form>

          {/* REGISTRO */}
          <p className="mt-7 text-center text-sm text-[#789184]">

            ¿No tienes una cuenta?{" "}

           <button
  type="button"
  onClick={irARegistro}
  className="
    font-bold
    text-[#4f9d69]
    hover:text-[#173b2a]
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
