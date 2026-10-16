import { useState } from 'react';
import { Search, Bell } from 'lucide-react';

/* ── Paleta del topbar (la misma del sidebar) ──────────────── */
const BG = 'bg-[#ffff]';
const SURFACE = 'bg-[#ffff]';        // superficie de los controles
const SURFACE_HOVER = 'hover:bg-[#2d5240]';
const BORDER = 'border-[#D1D5DB]';
const ACCENT = 'bg-[#22c55e]';
const TEXT = 'text-[#d6dad8]';
const MUTED = 'text-[#7d8c86]';

export interface UsuarioTopbar {
  nombre: string;
  rol: string;
}

interface TopbarProps {
  /** Usuario que se muestra a la derecha */
  usuario?: UsuarioTopbar;
  /** Placeholder del buscador */
  placeholder?: string;
  /** ¿Hay notificaciones sin leer? (muestra el punto verde) */
  hayNotificaciones?: boolean;
  /** Se dispara al escribir en el buscador */
  onBuscar?: (valor: string) => void;
  /** Se dispara al pulsar la campana */
  onNotificaciones?: () => void;
}

/** Iniciales para el avatar: "Emer Alcívar" → "EA" */
const iniciales = (nombre: string) =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase();

export default function Topbar({
  usuario = { nombre: 'Emer 404', rol: 'Administrador' },
  placeholder = 'Buscar insumos, lotes, cultivos...',
  hayNotificaciones = true,
  onBuscar,
  onNotificaciones,
}: TopbarProps) {
  const [busqueda, setBusqueda] = useState('');

  const handleBuscar = (valor: string) => {
    setBusqueda(valor);
    onBuscar?.(valor);
  };

  return (
    <header
      className={`h-[65px] flex-shrink-0 flex items-center justify-between gap-6 px-[28px] ${BG} border-b ${BORDER}`}
    >
      {/* Buscador */}
      <div className="relative flex items-center w-full max-w-[420px]">
        <Search
          className={`absolute left-[12px] w-[17px] h-[17px] ${MUTED} pointer-events-none`}
          strokeWidth={1.9}
        />
        <input
          type="search"
          value={busqueda}
          onChange={(e) => handleBuscar(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar"
          className={`w-full h-[38px] pl-[38px] pr-[14px] rounded-[8px] ${SURFACE} border ${BORDER} text-[13.5px] text-black placeholder:text-[#7d8c86] outline-none focus:border-[#22c55e] transition-colors`}
        />
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-[16px] shrink-0">

        {/* Notificaciones */}
        <button
          type="button"
          onClick={onNotificaciones}
          aria-label="Notificaciones"
          className={`relative w-[36px] h-[36px] rounded-[8px] ${SURFACE} border ${BORDER} ${SURFACE_HOVER} ${TEXT} hover:text-white flex items-center justify-center transition-colors`}
        >
          <Bell className="w-[17px] h-[17px]" strokeWidth={1.9} />
          {hayNotificaciones && (
            <span className={`absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full bg-red-500 border-2 border-red-500`} />
          )}
        </button>

        {/* Usuario */}
        <button
          type="button"
          className={`flex items-center gap-[10px] pl-[3px] pr-[8px] py-[3px] rounded-[8px] hover:scale-105 transition-transform duration-200`}
        >
          <span className={`w-[34px] h-[34px] rounded-[8px] ${ACCENT} text-white text-[12px] font-bold flex items-center justify-center shrink-0`}>
            {iniciales(usuario.nombre)}
          </span>
          <span className="text-left">
            <span className="block text-[13.5px] text-[#374151] font-semibold leading-none">{usuario.nombre}</span>
            <span className={`block text-[11px] ${MUTED} leading-none mt-[4px]`}>{usuario.rol}</span>
          </span>
        </button>

      </div>
    </header>
  );
}
