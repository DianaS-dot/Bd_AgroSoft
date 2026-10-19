import { useState } from "react";

export default function BarraLateral({
  paginaActual,
  cambiarPagina,
  cerrarSesion,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const opciones = [
    { nombre: "Inicio" },
    { nombre: "Perfil" },
    { nombre: "Cultivos" },
    { nombre: "Lotes" },

    { separador: true },

    { nombre: "Tratamientos" },
    { nombre: "Enfermedades" },

    { separador: true },

    { nombre: "Stock" },
    { nombre: "Ventas" },
    { nombre: "IoT / Sensores" },

    { separador: true },

    { nombre: "Sanidad", submenu: true },
    { nombre: "Administración", submenu: true },

    { separador: true },

    { nombre: "Estadísticas" },
    { nombre: "Usuarios" },
    { nombre: "Configuración" },
  ];

  const seleccionarPagina = (opcion) => {
    cambiarPagina(opcion);
    setMenuAbierto(false);
  };

  return (
    <>
      {/* =====================================================
          ESCRITORIO
      ====================================================== */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[270px] flex-col border-r border-[#1B362B] bg-[#12241C] text-[#9CA3AF] lg:flex">
        
        {/* Contenedor superior */}
        <div className="flex h-full flex-col overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#1B362B]">

          {/* LOGO */}
          <div className="flex items-center gap-3 px-6 pb-4 pt-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22c55e] shadow-md">
              <HojaIcono />
            </div>

            <div>
              <h1 className="text-[15px] font-extrabold leading-none tracking-wider text-white">
                AGROSOFT
              </h1>

              <span className="mt-1 block text-[11px] font-medium tracking-wide text-[#8C9893]">
                Gestión de finca
              </span>
            </div>
          </div>

          {/* MENÚ */}
          <nav className="flex-1 space-y-0.5 px-3 py-1">
            {opciones.map((item, index) => {
              if (item.separador) {
                return (
                  <div
                    key={`separador-${index}`}
                    className="mx-3 my-2 h-[1px] bg-[#1C3329]"
                  />
                );
              }

              const activo = paginaActual === item.nombre;

              return (
                <button
                  key={item.nombre}
                  type="button"
                  onClick={() => seleccionarPagina(item.nombre)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all ${
                    activo
                      ? "bg-[#214232] text-white shadow-sm"
                      : "text-[#9CA3AF] hover:bg-[#183126] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${
                        activo
                          ? "text-white"
                          : "text-[#8C9893] group-hover:text-white"
                      }`}
                    >
                      <IconoMenu opcion={item.nombre} />
                    </span>

                    <span className="tracking-tight">
                      {item.nombre}
                    </span>
                  </div>

                  {item.submenu && (
                    <ChevronDerechaIcono />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CERRAR SESIÓN */}
        <div className="border-t border-[#1C3329] bg-[#12241C] p-3">
          <button
            type="button"
            onClick={cerrarSesion}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-[#9CA3AF] transition-colors hover:bg-[#183126] hover:text-white"
          >
            <span className="text-[#8C9893] group-hover:text-white">
              <CerrarSesionIcono />
            </span>

            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          BOTÓN HAMBURGUESA — MÓVIL
      ====================================================== */}
      <button
        type="button"
        onClick={() => setMenuAbierto(true)}
        className="fixed left-4 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce6df] bg-white text-[#126033] shadow-sm transition hover:bg-[#eef7f0] lg:hidden"
        aria-label="Abrir menú"
      >
        <MenuIcono />
      </button>

      {/* =====================================================
          FONDO OSCURO — MÓVIL
      ====================================================== */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* =====================================================
          MENÚ MÓVIL
      ====================================================== */}
      <aside
        className={`fixed left-0 top-0 z-[60] flex h-screen w-[280px] flex-col border-r border-[#1B362B] bg-[#12241C] text-[#9CA3AF] shadow-xl transition-transform duration-300 lg:hidden ${
          menuAbierto
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Encabezado */}
        <div className="flex h-16 items-center justify-between border-b border-[#1C3329] px-5">
          
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22c55e] shadow-md">
              <HojaIcono />
            </div>

            <div>
              <h1 className="text-[15px] font-extrabold leading-none tracking-wider text-white">
                AGROSOFT
              </h1>

              <span className="mt-1 block text-[11px] font-medium tracking-wide text-[#8C9893]">
                Gestión de finca
              </span>
            </div>
          </div>

          {/* Cerrar menú */}
          <button
            type="button"
            onClick={() => setMenuAbierto(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8C9893] transition hover:bg-[#183126] hover:text-white"
            aria-label="Cerrar menú"
          >
            <CerrarIcono />
          </button>
        </div>

        {/* Opciones */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#1B362B]">
          {opciones.map((item, index) => {
            if (item.separador) {
              return (
                <div
                  key={`separador-mobile-${index}`}
                  className="mx-3 my-2 h-[1px] bg-[#1C3329]"
                />
              );
            }

            const activo = paginaActual === item.nombre;

            return (
              <button
                key={item.nombre}
                type="button"
                onClick={() => seleccionarPagina(item.nombre)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-[13.5px] font-medium transition-all ${
                  activo
                    ? "bg-[#214232] text-white shadow-sm"
                    : "text-[#9CA3AF] hover:bg-[#183126] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activo
                        ? "text-white"
                        : "text-[#8C9893] group-hover:text-white"
                    }`}
                  >
                    <IconoMenu opcion={item.nombre} />
                  </span>

                  <span className="tracking-tight">
                    {item.nombre}
                  </span>
                </div>

                {item.submenu && (
                  <ChevronDerechaIcono />
                )}
              </button>
            );
          })}
        </nav>

        {/* Cerrar sesión */}
        <div className="border-t border-[#1C3329] bg-[#12241C] p-3">
          <button
            type="button"
            onClick={cerrarSesion}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-[#9CA3AF] transition-colors hover:bg-[#183126] hover:text-white"
          >
            <span className="text-[#8C9893] group-hover:text-white">
              <CerrarSesionIcono />
            </span>

            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   ICONOS DEL MENÚ
========================================================= */

function IconoMenu({ opcion }) {
  const iconos = {
    Inicio: <InicioIcono />,
    Perfil: <PerfilIcono />,
    Cultivos: <PlantaIcono />,
    Lotes: <MapaIcono />,
    Tratamientos: <TratamientoIcono />,
    Enfermedades: <EnfermedadIcono />,
    Stock: <CajaIcono />,
    Ventas: <VentaIcono />,
    "IoT / Sensores": <SensoresIcono />,
    Sanidad: <SanidadIcono />,
    Administración: <AdministracionIcono />,
    Estadísticas: <EstadisticaIcono />,
    Usuarios: <UsuariosIcono />,
    Configuración: <ConfiguracionIcono />,
  };

  return iconos[opcion] || <CirculoIcono />;
}

/* =========================================================
   ICONOS SVG
========================================================= */

function MenuIcono() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CerrarIcono() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function HojaIcono() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 11-7 10-16Z" />
      <path d="M5 20c3-5 6-8 11-11" fill="none" />
    </svg>
  );
}

function InicioIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function PerfilIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
    </svg>
  );
}

function PlantaIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21V9" />
      <path d="M12 13c-4 0-6-2-6-6 4 0 6 2 6 6Z" />
      <path d="M12 10c0-4 2-6 6-6 0 4-2 6-6 6Z" />
    </svg>
  );
}

function MapaIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
      <path d="M9 3v15" />
      <path d="M15 6v15" />
    </svg>
  );
}

function TratamientoIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 13.5 17 7a3.5 3.5 0 0 0-5-5l-6.5 6.5a3.5 3.5 0 1 0 5 5Z" />
      <path d="m8 8 5 5" />
    </svg>
  );
}

function EnfermedadIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0v-4a4 4 0 0 1 4-4Z" />
      <path d="M9 8 7 5" />
      <path d="M15 8l2-3" />
      <path d="M8 12H4" />
      <path d="M20 12h-4" />
      <path d="M8 16H4" />
      <path d="M20 16h-4" />
    </svg>
  );
}

function CajaIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="m4 7.5 8 4.5 8-4.5" />
      <path d="M12 12v9" />
    </svg>
  );
}

function VentaIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M15 9.5c-.5-1-1.5-1.5-3-1.5-2 0-3 1-3 2.2 0 3.2 6 1.3 6 4.2 0 1.3-1 2.1-3 2.1-1.5 0-2.5-.5-3-1.5" />
    </svg>
  );
}

function SensoresIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M5.5 5.5a9 9 0 0 0 0 13" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function SanidadIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Z" />
      <path d="M12 8v6" />
      <path d="M9 11h6" />
    </svg>
  );
}

function AdministracionIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M7 11v5c2.5 2 7.5 2 10 0v-5" />
      <path d="M21 8v6" />
    </svg>
  );
}

function EstadisticaIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </svg>
  );
}

function UsuariosIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5" />
      <path d="M17 14c2.5.3 4 2 4 5" />
    </svg>
  );
}

function ConfiguracionIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6.7v-2.4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1Z" />
    </svg>
  );
}

function ChevronDerechaIcono() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#6B7280] transition group-hover:text-gray-300"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CirculoIcono() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function CerrarSesionIcono() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
