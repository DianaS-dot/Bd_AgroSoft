import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, User, Hash, Phone, Home } from 'lucide-react';

export const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: 'Andrés',
    apellido: 'Morales',
    rol: 'Aprendiz',
    idFicha: '2845971',
    telefono: '3001234567',
    nombreFinca: 'Finca El Porvenir',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de registro:', formData);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fafafa]">
      {/* Lado Izquierdo: Banner Verde Oscuro */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 bg-[#123e28]">
        {/* Cuadro decorativo transparente arriba a la izquierda */}
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

      {/* Lado Derecho: Formulario de Registro */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#123e28] tracking-tight">Crear una cuenta</h2>
            <p className="text-xs font-medium text-emerald-600/80">
              Completa tus datos para comenzar a usar AgroSoft.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre y Apellido en paralelo */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Nombre</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Andrés"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#123e28] focus:ring-1 focus:ring-[#123e28]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Apellido</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Morales"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#123e28] focus:ring-1 focus:ring-[#123e28]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Rol */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Rol</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#123e28] focus:ring-1 focus:ring-[#123e28] text-slate-700 cursor-pointer"
              >
                <option value="Aprendiz">Aprendiz</option>
                <option value="Instructor">Instructor</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>

            {/* ID de ficha */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">ID de ficha</label>
              <div className="relative flex items-center">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  name="idFicha"
                  value={formData.idFicha}
                  onChange={handleChange}
                  placeholder="2845971"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#123e28] focus:ring-1 focus:ring-[#123e28]"
                  required
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Teléfono</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="3001234567"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#123e28] focus:ring-1 focus:ring-[#123e28]"
                  required
                />
              </div>
            </div>

            {/* Nombre de la finca */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Nombre de la finca</label>
              <div className="relative flex items-center">
                <Home className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  name="nombreFinca"
                  value={formData.nombreFinca}
                  onChange={handleChange}
                  placeholder="Finca El Porvenir"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#123e28] focus:ring-1 focus:ring-[#123e28]"
                  required
                />
              </div>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#123e28] hover:bg-[#0c2a1b] text-white text-xs font-semibold rounded-lg transition-colors mt-2"
            >
              Crear cuenta
            </button>

            {/* Enlace al login */}
            <p className="text-center text-xs text-slate-500 pt-2">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/" className="font-semibold text-emerald-600 hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;