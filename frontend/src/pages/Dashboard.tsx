import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { Sensor } from '../types/sensor';
import { SensorAlerta } from '../types/sensor-alerta';

interface Stats {
  sensores: number;
  sensoresActivos: number;
  sensorLecturas: number;
  sensorAlertas: number;
  tiposSensores: number;
  iotConfigs: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<SensorAlerta[]>([]);
  const [recentSensors, setRecentSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get<Sensor[]>('/sensores'),
      api.get<unknown[]>('/sensor-lecturas'),
      api.get<SensorAlerta[]>('/sensor-alertas'),
      api.get<unknown[]>('/tipos-sensores'),
      api.get<unknown[]>('/iot-global-config'),
    ])
      .then(([sensors, lecturas, alertas, tipos, configs]) => {
        const sensoresArr = Array.isArray(sensors) ? sensors : [];
        const alertasArr = Array.isArray(alertas) ? alertas : [];

        setStats({
          sensores: sensoresArr.length,
          sensoresActivos: sensoresArr.filter((s) => s.activo).length,
          sensorLecturas: Array.isArray(lecturas) ? lecturas.length : 0,
          sensorAlertas: alertasArr.length,
          tiposSensores: Array.isArray(tipos) ? tipos.length : 0,
          iotConfigs: Array.isArray(configs) ? configs.length : 0,
        });

        setRecentAlerts(alertasArr.slice(-5).reverse());
        setRecentSensors(sensoresArr.slice(-5).reverse());
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-green-600" />
          <span className="text-sm text-gray-500">Cargando dashboard...</span>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Sensores',
      value: stats?.sensores ?? 0,
      sub: `${stats?.sensoresActivos ?? 0} activos`,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      path: '/sensores',
    },
    {
      label: 'Lecturas',
      value: stats?.sensorLecturas ?? 0,
      sub: 'registros totales',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      path: '/sensor-lecturas',
    },
    {
      label: 'Alertas',
      value: stats?.sensorAlertas ?? 0,
      sub: 'alertas activas',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      path: '/sensor-alertas',
    },
    {
      label: 'Tipos Sensor',
      value: stats?.tiposSensores ?? 0,
      sub: 'categorías',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      path: '/tipos-sensores',
    },
    {
      label: 'Config IoT',
      value: stats?.iotConfigs ?? 0,
      sub: 'configuraciones',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      path: '/iot-global-config',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Vista general del sistema IoT</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <button
            key={card.label}
            onClick={() => navigate(card.path)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-left hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{card.value}</span>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{card.label}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-0.5">{card.value.toLocaleString()}</p>
            <p className={`text-xs ${card.textColor} mt-1`}>{card.sub}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Alertas Recientes</h2>
            <button
              onClick={() => navigate('/sensor-alertas')}
              className="text-xs text-green-600 hover:text-green-800 font-medium"
            >
              Ver todas
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentAlerts.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-gray-400">
                No hay alertas recientes
              </div>
            ) : (
              recentAlerts.map((alert) => (
                <div key={alert.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Sensor #{alert.sensorId}</p>
                      <p className="text-xs text-gray-400">{alert.tipo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700">{alert.valor}</p>
                    <p className="text-xs text-gray-400">Umbral: {alert.umbral}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Sensores Recientes</h2>
            <button
              onClick={() => navigate('/sensores')}
              className="text-xs text-green-600 hover:text-green-800 font-medium"
            >
              Ver todos
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentSensors.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-gray-400">
                No hay sensores registrados
              </div>
            ) : (
              recentSensors.map((sensor) => (
                <div key={sensor.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${sensor.activo ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{sensor.nombreSensor}</p>
                      <p className="text-xs text-gray-400">{sensor.protocolo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700">{sensor.ultimoValor || '--'}</p>
                    <p className="text-xs text-gray-400">{sensor.estado}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
