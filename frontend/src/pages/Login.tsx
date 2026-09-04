import { useState } from "react";
import { useNavigate } from "react-router-dom";
import farmBg from "../assets/farm_bg.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email && password) {
        localStorage.setItem("authToken", "simulated-token");
        localStorage.setItem("userEmail", email);
        navigate("/stock");
      } else {
        setError("Por favor completa todos los campos");
      }
    } catch {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      {/* ── Panel izquierdo ─────────────────────────────── */}
      <div className="login-left">
        <img src={farmBg} alt="Campo agrícola" className="login-left-bg" />
        <div className="login-left-overlay" />
        <div className="login-left-content">
          <div className="login-brand">
            <div className="login-brand-icon">
              {/* Leaf SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 4 13c0-5.5 5-9 9-9s7 3.5 7 9a7 7 0 0 1-7 7z"/>
                <path d="M11 20v-9"/>
              </svg>
            </div>
            <span className="login-brand-name">AGROSOFT</span>
          </div>
          <div className="login-left-text">
            <h2 className="login-left-heading">Gestión de finca</h2>
            <p className="login-left-sub">
              Optimiza tus cultivos y administra tu tierra de forma inteligente.
            </p>
          </div>
        </div>
      </div>

      {/* ── Panel derecho ────────────────────────────────── */}
      <div className="login-right">
        <div className="login-form-wrapper">
          <div className="login-form-header">
            <h1 className="login-form-title">Bienvenido a AgroSoft</h1>
            <p className="login-form-sub">Ingresa tus datos para acceder a tu cuenta.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* Email */}
            <div className="login-field">
              <label htmlFor="email" className="login-label">
                Correo electrónico
              </label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  placeholder="admin@agrosoft.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="login-field">
              <label htmlFor="password" className="login-label">
                Contraseña
              </label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input login-input--has-action"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-input-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Recordarme + Olvidaste */}
            <div className="login-row">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox"
                />
                <span>Recordarme</span>
              </label>
              <a href="#" className="login-forgot">¿Olvidaste tu contraseña?</a>
            </div>

            {/* Error */}
            {error && (
              <div className="login-error-banner" role="alert">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="login-btn-submit"
            >
              {loading ? (
                <>
                  <span className="login-spinner" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <p className="login-register-prompt">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="login-register-link">Crear cuenta</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;