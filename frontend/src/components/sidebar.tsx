import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Home,
  User,
  Sprout,
  Map,
  Pill,
  Bug,
  Package,
  DollarSign,
  Wifi,
  GraduationCap,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Leaf
} from 'lucide-react';

type MenuItem =
  | { divider: true }
  | { name: string; icon: LucideIcon; hasSubmenu?: boolean };

/* ── Paleta del sidebar (medida desde el diseño) ───────────── */
const BG = 'bg-[#1a3028]';           // fondo
const ACTIVE_BG = 'bg-[#2d5240]';    // ítem activo
const HOVER_BG = 'hover:bg-[#22392f]';
const DIVIDER = 'bg-[#31453e]';      // separadores
const ACCENT = 'bg-[#22c55e]';       // barra e icono de marca
const TEXT = 'text-[#d6dad8]';       // texto / iconos inactivos
const MUTED = 'text-[#7d8c86]';      // subtítulo del logo

export default function BarraLateral() {
  const [activeItem, setActiveItem] = useState<string>('Stock');

  const menuItems: MenuItem[] = [
    { name: 'Inicio', icon: Home },
    { name: 'Perfil', icon: User },
    { name: 'Cultivos', icon: Sprout },
    { name: 'Lotes', icon: Map },
    { divider: true },
    { name: 'Tratamientos', icon: Pill },
    { name: 'Enfermedades', icon: Bug },
    { divider: true },
    { name: 'Stock', icon: Package },
    { name: 'Ventas', icon: DollarSign },
    { name: 'IoT / Sensores', icon: Wifi },
    { divider: true },
    { name: 'Administración', icon: GraduationCap, hasSubmenu: true },
    { divider: true },
    { name: 'Estadísticas', icon: BarChart3 },
    { name: 'Usuarios', icon: Users },
    { name: 'Configuración', icon: Settings },
  ];

  return (
    <aside className={`w-[220px] h-screen flex-shrink-0 flex flex-col ${BG} ${TEXT} select-none font-sans`}>

      {/* Logo + Navegación */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#31453e]">

        {/* Logo */}
        <div className="flex items-center gap-[11px] pl-[10px] pr-[10px] pt-[13px] pb-[18px]">
          <div className={`w-[34px] h-[34px] rounded-[8px] ${ACCENT} flex items-center justify-center shrink-0`}>
            <Leaf className="w-[19px] h-[19px] text-white" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-white text-[14px] font-bold tracking-[0.08em] leading-none">AGROSOFT</h1>
            <span className={`block text-[11px] ${MUTED} leading-none mt-[6px] font-normal`}>Gestión de finca</span>
          </div>
        </div>

        {/* Separador bajo el logo */}
        <div className={`h-px ${DIVIDER}`} />

        {/* Opciones de menú */}
        <nav className="flex flex-col gap-px px-[5px] pt-[10px] pb-[10px] flex-1">
          {menuItems.map((item, index) => {
            if ('divider' in item) {
              return <div key={index} className={`h-px ${DIVIDER} my-[5px] mx-[5px]`} />;
            }

            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveItem(item.name)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative w-full h-[39px] flex items-center pl-[15px] pr-[15px] rounded-[8px] text-[14px] text-left transition-colors ${
                  isActive
                    ? `${ACTIVE_BG} text-white font-semibold`
                    : `${TEXT} font-medium ${HOVER_BG} hover:text-white`
                }`}
              >
                {isActive && (
                  <span className={`absolute -left-[3px] top-1/2 -translate-y-1/2 w-[3px] h-[31px] rounded-full ${ACCENT}`} />
                )}

                <Icon className="w-[17px] h-[17px] shrink-0" strokeWidth={1.9} />
                <span className="ml-[11px] truncate">{item.name}</span>

                {item.hasSubmenu && (
                  <ChevronRight className="w-[16px] h-[16px] ml-auto shrink-0 text-[#788581]" strokeWidth={2} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Cerrar sesión */}
      <div className={`border-t border-[#31453e] px-[5px] pt-[10px] pb-[17px]`}>
        <button
          type="button"
          onClick={() => console.log('Cerrar sesión')}
          className={`w-full h-[39px] flex items-center pl-[15px] pr-[15px] rounded-[8px] text-[14px] text-left ${TEXT} font-medium ${HOVER_BG} hover:text-white transition-colors`}
        >
          <LogOut className="w-[17px] h-[17px] shrink-0" strokeWidth={1.9} />
          <span className="ml-[11px]">Cerrar sesión</span>
        </button>
      </div>

    </aside>
  );
}
