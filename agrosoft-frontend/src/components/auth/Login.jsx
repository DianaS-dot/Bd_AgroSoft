import { useState } from "react";
import { login } from "../services/authService";

function Login() {
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

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      setMensaje("Inicio de sesión exitoso ✅");

    } catch (error) {
      console.error(error);

      setMensaje(
        error.response?.data?.message ||
        "Correo o contraseña incorrectos"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🌱</span>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-green-700 text-center">
          AgroSoft
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Ingresa a tu cuenta
        </p>

        <form onSubmit={handleSubmit}>

          {/* Correo */}
          <div className="mb-5">

            <label className="block text-gray-700 font-semibold mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@gmail.com"
              required
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
                transition
              "
            />

          </div>

          {/* Contraseña */}
          <div className="mb-3">

            <label className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-green-500
                transition
              "
            />

          </div>

          {/* Recuperar contraseña */}
          <div className="text-right mb-6">

            <button
              type="button"
              className="text-sm text-green-600 hover:text-green-800"
            >
              ¿Olvidaste tu contraseña?
            </button>

          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={cargando}
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              disabled:bg-green-300
              text-white
              font-bold
              py-3
              rounded-xl
              transition
              duration-200
            "
          >
            {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

        </form>

        {/* Mensaje */}
        {mensaje && (
          <p className="text-center text-green-600 font-semibold mt-5">
            {mensaje}
          </p>
        )}

        {/* Crear cuenta */}
        <p className="text-center text-gray-500 mt-7">

          ¿No tienes una cuenta?{" "}

          <button
            type="button"
            className="text-green-600 font-bold hover:text-green-800"
          >
            Crear cuenta
          </button>

        </p>

      </div>

    </div>
  );
}

export default Login;