import React, { useState } from 'react';
import Sidebar from '../componentes/Sidebar';
import { Search, Bell, User, Edit3, Lock, LogOut, HelpCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Perfil = () => {
  // Estados para controlar los modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  // Estados del formulario "Editar perfil"
  const [nombre, setNombre] = useState('Andrés Morales');
  const [email, setEmail] = useState('andres@agrosoft.com');
  const [telefono, setTelefono] = useState('+57 310 234 5678');

  // Estados del formulario "Cambiar contraseña"
  const [currentPassword, setCurrentPassword] = useState('••••••••');
  const [newPassword, setNewPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');

  // Manejo de guardar cambios de perfil
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Perfil actualizado:', { nombre, email, telefono });
    setShowEditModal(false);
  };

  // Manejo de cambiar contraseña
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contraseña actualizada');
    setShowPassModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] relative">
      {/* Sidebar Reutilizable */}
      <Sidebar />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Barra Superior / Header */}
        <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar cultivos, lotes, tratamientos..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#123e28] transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full border border-slate-100">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2.5 border border-slate-200 rounded-full pl-1 pr-3 py-1 bg-white">
              <div className="w-7 h-7 rounded-full bg-[#123e28] text-white flex items-center justify-center font-bold text-xs">
                AM
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">{nombre}</p>
                <p className="text-[10px] text-slate-400">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Cuerpo de la Página */}
        <main className="p-8 space-y-6 overflow-y-auto">
          {/* Título */}
          <div className="flex items-center gap-2 text-[#123e28]">
            <User className="w-5 h-5" />
            <h1 className="text-xl font-bold">Mi perfil</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tarjeta Izquierda - Resumen Usuario */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-[#123e28] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                AM
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">{nombre}</h2>
                <span className="inline-block mt-1 px-3 py-0.5 bg-blue-100 text-blue-600 text-[11px] font-semibold rounded-full">
                  Administrador
                </span>
              </div>

              <div className="w-full space-y-2 pt-2">
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="w-full py-2 px-4 bg-[#123e28] hover:bg-[#0c2a1b] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Editar perfil
                </button>

                <button 
                  onClick={() => setShowPassModal(true)}
                  className="w-full py-2 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Cambiar contraseña
                </button>

                <Link
                  to="/"
                  className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors block text-center"
                >
                  <LogOut className="w-3.5 h-3.5 inline" />
                  Cerrar sesión
                </Link>
              </div>
            </div>

            {/* Columna Derecha - Información Detallada */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sección Información Personal */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#123e28]">Información personal</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Nombre completo</p>
                    <p className="text-xs font-semibold text-slate-700">{nombre}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Correo electrónico</p>
                    <p className="text-xs font-semibold text-slate-700">{email}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Teléfono</p>
                    <p className="text-xs font-semibold text-slate-700">{telefono}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Rol</p>
                    <p className="text-xs font-semibold text-slate-700">Administrador</p>
                  </div>
                </div>
              </div>

              {/* Sección Información de la finca */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#123e28]">Información de la finca</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Nombre de la finca</p>
                    <p className="text-xs font-semibold text-slate-700">Finca El Paraíso</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Municipio</p>
                    <p className="text-xs font-semibold text-slate-700">Salento, Quindío</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Área total</p>
                    <p className="text-xs font-semibold text-slate-700">17.3 ha</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Cultivos registrados</p>
                    <p className="text-xs font-semibold text-slate-700">5</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Lotes</p>
                    <p className="text-xs font-semibold text-slate-700">3</p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Trabajadores</p>
                    <p className="text-xs font-semibold text-slate-700">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Botón Flotante de Ayuda */}
        <button 
          className="fixed bottom-6 right-6 p-3 bg-white border border-slate-200 text-slate-500 rounded-full shadow-lg hover:shadow-xl hover:text-slate-800 transition-all"
          title="Ayuda"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: EDITAR PERFIL */}
      {/* ========================================================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Encabezado */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#123e28]">Editar perfil</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#123e28]">Nombre completo</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#123e28] text-slate-700"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#123e28]">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#123e28] text-slate-700"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#123e28]">Teléfono</label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#123e28] text-slate-700"
                  required
                />
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#123e28] text-xs font-bold rounded-2xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#123e28] hover:bg-[#0c2a1b] text-white text-xs font-bold rounded-2xl transition-colors shadow-sm"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: CAMBIAR CONTRASEÑA */}
      {/* ========================================================= */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Encabezado */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#123e28]">Cambiar contraseña</h2>
              <button 
                onClick={() => setShowPassModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#123e28]">Contraseña actual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#123e28] text-slate-700"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#123e28]">Nueva contraseña</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#123e28] text-slate-700"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#123e28]">Confirmar nueva contraseña</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:border-[#123e28] text-slate-700"
                  required
                />
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#123e28] text-xs font-bold rounded-2xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#123e28] hover:bg-[#0c2a1b] text-white text-xs font-bold rounded-2xl transition-colors shadow-sm"
                >
                  Cambiar contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;