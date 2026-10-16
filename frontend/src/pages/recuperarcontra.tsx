import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, ArrowLeft, HelpCircle } from 'lucide-react';

export const RecuperarContra = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Solicitud de recuperación para:', email);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fafafa]">
      {/* Lado Izquierdo: Banner Verde Oscuro Idéntico */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 bg-[#123e28]">
        {/* Cuadro decorativo transparente */}
        <div className="absolute top-6 left-6 w-12 h-12 bg-white/5 rounded-md" />

        <div className="max-w-sm text-center text-white space-y-6">
          <div className="inline-flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
              <Leaf className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="font-extrabold text-2xl tracking-wider">AGROSOFT</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Gestión de finca</h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">
              Optimiza tus cultivos y administra tu tierra de forma inteligente.
            </p>
          </div>
        </div>
      </div>

      {/* Lado Derecho: Formulario de Recuperación */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recuperar contraseña</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ingresa tu correo electrónico registrado y te enviaremos las instrucciones para restablecerla.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Correo electrónico</label>
              <div className="relative flex items-center">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@agrosoft.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#123e28] focus:ring-1 focus:ring-[#123e28] transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#123e28] hover:bg-[#0c2a1b] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all"
            >
              Enviar instrucciones
            </button>

            <div className="text-center pt-2">
              {/* CAMBIO AQUÍ: to="/" para redirigir a la ruta principal de inicio de sesión */}
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#123e28] hover:underline transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al inicio de sesión</span>
              </Link>
            </div>
          </form>
        </div>

        <button 
          className="absolute bottom-6 right-6 p-2.5 bg-white border border-slate-200 text-slate-500 rounded-full shadow-sm hover:shadow-md hover:text-slate-700 transition-all"
          title="Ayuda"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RecuperarContra;