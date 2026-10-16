import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf, Home, User, Sprout, Layers, FlaskConical, 
  Bug, Package, DollarSign, BarChart3, Users, Settings, LogOut 
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Inicio', icon: Home, path: '/dashboard' },
    { name: 'Perfil', icon: User, path: '/perfil' },
    { name: 'Cultivos', icon: Sprout, path: '/cultivos' },
    { name: 'Lotes', icon: Layers, path: '/lotes' },
    { name: 'Tratamientos', icon: FlaskConical, path: '/tratamientos' },
    { name: 'Enfermedades', icon: Bug, path: '/enfermedades' },
    { name: 'Stock', icon: Package, path: '/stock' },
    { name: 'Ventas', icon: DollarSign, path: '/ventas' },
    { name: 'Estadísticas', icon: BarChart3, path: '/estadisticas' },
    { name: 'Usuarios', icon: Users, path: '/usuarios' },
    { name: 'Configuración', icon: Settings, path: '/configuracion' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="p-2 bg-[#123e28] text-white rounded-lg">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-800 text-base leading-none">AGROSOFT</h1>
            <span className="text-[10px] text-slate-400 font-medium">Gestión de finca</span>
          </div>
        </div>

        {/* Links de Navegación */}
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#123e28] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Cerrar sesión al final */}
      <div className="p-4 border-t border-slate-100">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;