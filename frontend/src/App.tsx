import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { SensoresPage } from './pages/SensoresPage';
import { SensorLecturasPage } from './pages/SensorLecturasPage';
import { SensorAlertasPage } from './pages/SensorAlertasPage';
import { TiposSensoresPage } from './pages/TiposSensoresPage';
import { IotGlobalConfigPage } from './pages/IotGlobalConfigPage';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sensores" element={<SensoresPage />} />
            <Route path="/sensor-lecturas" element={<SensorLecturasPage />} />
            <Route path="/sensor-alertas" element={<SensorAlertasPage />} />
            <Route path="/tipos-sensores" element={<TiposSensoresPage />} />
            <Route path="/iot-global-config" element={<IotGlobalConfigPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ToastProvider>
  );
}
