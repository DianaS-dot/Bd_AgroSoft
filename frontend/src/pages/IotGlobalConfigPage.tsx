import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { IotGlobalConfig } from '../types/iot-global-config';
import { EntityTable } from '../components/EntityTable';
import { EntityForm, FieldConfig } from '../components/EntityForm';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

const INITIAL: IotGlobalConfig = {
  name: '',
  broker: '',
  port: 1883,
  protocol: 'mqtt',
  topicPrefix: '',
  defaultTopics: '',
  customTopics: '',
  loteId: 0,
  subLoteId: 0,
  username: '',
  password: '',
  activo: true,
  defaultSensorsInitialized: false,
  autoDiscover: false,
};

const FIELDS: FieldConfig[] = [
  { name: 'name', label: 'Nombre', type: 'text', required: true, placeholder: 'Config principal' },
  { name: 'broker', label: 'Broker', type: 'text', required: true, placeholder: 'mqtt://broker.example.com' },
  { name: 'port', label: 'Puerto', type: 'number', required: true, min: 1, max: 65535 },
  { name: 'protocol', label: 'Protocolo', type: 'text', required: true, placeholder: 'mqtt, mqtts, ws...' },
  { name: 'topicPrefix', label: 'Topic Prefix', type: 'text', placeholder: 'agrosoft/' },
  { name: 'defaultTopics', label: 'Default Topics', type: 'text' },
  { name: 'customTopics', label: 'Custom Topics', type: 'text' },
  { name: 'loteId', label: 'Lote ID', type: 'number' },
  { name: 'subLoteId', label: 'SubLote ID', type: 'number' },
  { name: 'username', label: 'Usuario', type: 'text' },
  { name: 'password', label: 'Contraseña', type: 'text' },
  { name: 'activo', label: 'Activo', type: 'checkbox' },
  { name: 'defaultSensorsInitialized', label: 'Sensors Inicializados', type: 'checkbox' },
  { name: 'autoDiscover', label: 'Auto Discover', type: 'checkbox' },
];

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre', searchable: true },
  { key: 'broker', label: 'Broker', searchable: true },
  { key: 'port', label: 'Puerto' },
  { key: 'protocol', label: 'Protocolo' },
  { key: 'activo', label: 'Activo', render: (item: IotGlobalConfig) => (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${item.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${item.activo ? 'bg-green-500' : 'bg-gray-400'}`} />
      {item.activo ? 'Sí' : 'No'}
    </span>
  )},
];

export function IotGlobalConfigPage() {
  const [items, setItems] = useState<IotGlobalConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<IotGlobalConfig | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>(INITIAL as unknown as Record<string, unknown>);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    api.get<IotGlobalConfig[]>('/iot-global-config')
      .then(setItems)
      .catch(() => showToast('Error al cargar configuraciones', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setValues(INITIAL as unknown as Record<string, unknown>); setShowForm(true); };
  const openEdit = (item: IotGlobalConfig) => { setEditing(item); setValues(item as unknown as Record<string, unknown>); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing?.id) {
        await api.put(`/iot-global-config/${editing.id}`, values);
        showToast('Configuración actualizada correctamente', 'success');
      } else {
        await api.post('/iot-global-config', values);
        showToast('Configuración creada correctamente', 'success');
      }
      closeForm();
      load();
    } catch {
      showToast('Error al guardar la configuración', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este registro?')) return;
    try {
      await api.delete(`/iot-global-config/${id}`);
      showToast('Configuración eliminada correctamente', 'success');
      load();
    } catch {
      showToast('Error al eliminar la configuración', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">IoT Global Config</h1>
          <p className="text-sm text-gray-500 mt-1">Configuración global de conexiones IoT</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Config
        </button>
      </div>
      <EntityTable
        columns={COLUMNS}
        data={items}
        onEdit={openEdit}
        onDelete={handleDelete}
        loading={loading}
        searchPlaceholder="Buscar por nombre o broker..."
      />
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={editing ? 'Editar Config' : 'Nueva Config'}
      >
        <EntityForm
          fields={FIELDS}
          values={values}
          onChange={(name, val) => setValues((prev) => ({ ...prev, [name]: val }))}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitLabel={editing ? 'Actualizar' : 'Crear'}
        />
      </Modal>
    </div>
  );
}
