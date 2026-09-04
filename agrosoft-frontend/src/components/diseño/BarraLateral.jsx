import { useState } from "react";

export default function BarraLateral({
  paginaActual,
  cambiarPagina,
  cerrarSesion,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const opciones = [
    "Inicio",
    "Perfil",
    "Cultivos",
    "Lotes",
    "Tratamientos",
    "Enfermedades",
    "Stock",
    "Ventas",
    "Estadísticas",
    "Usuarios",
    "Configuración",
  ];

  const seleccionarPagina = (opcion) => {
  cambiarPagina(opcion);
  setMenuAbierto(false);
};

  return (
    <>
      {/* ================= ESCRITORIO ================= */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[245px] border-r border-[#dce6df] bg-white lg:block">

        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-[#e4ebe6] px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#178343] text-white">
            <HojaIcono />
          </div>

          <div>
            <h1 className="text-[16px] font-bold tracking-wide text-[#126b38]">
              AGROSOFT
            </h1>

            <p className="text-[10px] text-[#7c9a89]">
              Gestión de finca
            </p>
          </div>
        </div>

        {/* Menú */}
        <nav className="flex flex-col gap-1 p-3">
          {opciones.map((opcion) => (
            <button
              key={opcion}
              type="button"
              onClick={() =>
                seleccionarPagina(opcion)
              }
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                paginaActual === opcion
                  ? "bg-[#125d32] font-semibold text-white"
                  : "text-[#285d40] hover:bg-[#eef7f0]"
              }`}
            >
              <IconoMenu opcion={opcion} />
              {opcion}
            </button>
          ))}
        </nav>

        {/* Cerrar sesión */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#e4ebe6] p-3">
          <button
            type="button"
            onClick={cerrarSesion}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#245b3c] transition hover:bg-[#eef7f0]"
          >
            <CerrarSesionIcono />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ================= MÓVIL ================= */}

      {/* Botón hamburguesa */}
      <button
        type="button"
        onClick={() =>
          setMenuAbierto(true)
        }
        className="fixed left-4 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-[#dce6df] bg-white text-[#126033] shadow-sm transition hover:bg-[#eef7f0] lg:hidden"
        aria-label="Abrir menú"
      >
        <MenuIcono />
      </button>

      {/* Fondo oscuro */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-50 bg-black/30 lg:hidden"
          onClick={() =>
            setMenuAbierto(false)
          }
        />
      )}

      {/* Menú móvil */}
      <aside
        className={`fixed left-0 top-0 z-[60] h-screen w-[280px] border-r border-[#dce6df] bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          menuAbierto
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Encabezado del menú */}
        <div className="flex h-16 items-center justify-between border-b border-[#e4ebe6] px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#178343] text-white">
              <HojaIcono />
            </div>

            <div>
              <h1 className="text-[16px] font-bold tracking-wide text-[#126b38]">
                AGROSOFT
              </h1>

              <p className="text-[10px] text-[#7c9a89]">
                Gestión de finca
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setMenuAbierto(false)
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6d8376] hover:bg-[#eef7f0] hover:text-[#173b2a]"
            aria-label="Cerrar menú"
          >
            <CerrarIcono />
          </button>
        </div>

        {/* Opciones */}
        <nav className="flex flex-col gap-1 overflow-y-auto p-3">
          {opciones.map((opcion) => (
            <button
              key={opcion}
              type="button"
              onClick={() =>
                seleccionarPagina(opcion)
              }
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                paginaActual === opcion
                  ? "bg-[#125d32] font-semibold text-white"
                  : "text-[#285d40] hover:bg-[#eef7f0]"
              }`}
            >
              <IconoMenu opcion={opcion} />
              {opcion}
            </button>
          ))}
        </nav>

        {/* Cerrar sesión */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#e4ebe6] bg-white p-3">
          <button
            type="button"
            onClick={cerrarSesion}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#245b3c] transition hover:bg-[#eef7f0]"
          >
            <CerrarSesionIcono />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

/* ================= ICONOS ================= */

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
    Estadísticas: <EstadisticaIcono />,
    Usuarios: <UsuariosIcono />,
    Configuración: <ConfiguracionIcono />,
  };

  return iconos[opcion] || <CirculoIcono />;
}

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
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 11-7 10-16Z" />
      <path d="M5 20c3-5 6-8 11-11" />
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

function CirculoIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function CerrarSesionIcono() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}