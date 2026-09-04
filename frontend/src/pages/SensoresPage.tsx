import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Sensor } from '../types/sensor';
import { EntityTable } from '../components/EntityTable';
import { EntityForm, FieldConfig } from '../components/EntityForm';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

const INITIAL: Sensor = {
  nombreSensor: '',
  tipoSensorId: 0,
  protocolo: '',
  endpointUrl: '',
  mqttTopic: '',
  valorMinimoSensor: 0,
  valorMaximoSensor: 0,
  activo: true,
  estadoConexion: '',
  estado: '',
  ultimoValor: '',
  ultimaMedicion: '',
  lastSeenAt: '',
  cultivoId: 0,
  creadoPorUsuarioId: 0,
  globalConfigId: 0,
  loteId: 0,
  subLoteId: 0,
};

const FIELDS: FieldConfig[] = [
  { name: 'nombreSensor', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej: Sensor de humedad' },
  { name: 'tipoSensorId', label: 'Tipo Sensor ID', type: 'number', required: true },
  { name: 'protocolo', label: 'Protocolo', type: 'text', required: true, placeholder: 'MQTT, HTTP...' },
  { name: 'endpointUrl', label: 'Endpoint URL', type: 'text', placeholder: 'http://...' },
  { name: 'mqttTopic', label: 'MQTT Topic', type: 'text', placeholder: 'sensores/campo1/humedad' },
  { name: 'valorMinimoSensor', label: 'Valor Mínimo', type: 'number', required: true },
  { name: 'valorMaximoSensor', label: 'Valor Máximo', type: 'number', required: true },
  { name: 'activo', label: 'Activo', type: 'checkbox' },
  { name: 'estadoConexion', label: 'Estado Conexión', type: 'text' },
  { name: 'estado', label: 'Estado', type: 'text' },
  { name: 'ultimoValor', label: 'Último Valor', type: 'text', readOnly: true },
  { name: 'ultimaMedicion', label: 'Última Medición', type: 'datetime-local', readOnly: true },
  { name: 'lastSeenAt', label: 'Last Seen At', type: 'datetime-local', readOnly: true },
  { name: 'cultivoId', label: 'Cultivo ID', type: 'number' },
  { name: 'creadoPorUsuarioId', label: 'Creado Por Usuario ID', type: 'number' },
  { name: 'globalConfigId', label: 'Global Config ID', type: 'number' },
  { name: 'loteId', label: 'Lote ID', type: 'number' },
  { name: 'subLoteId', label: 'SubLote ID', type: 'number' },
];

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'nombreSensor', label: 'Nombre', searchable: true },
  { key: 'protocolo', label: 'Protocolo', searchable: true },
  { key: 'estado', label: 'Estado', searchable: true },
  { key: 'activo', label: 'Activo', render: (item: Sensor) => (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${item.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${item.activo ? 'bg-green-500' : 'bg-gray-400'}`} />
      {item.activo ? 'Sí' : 'No'}
    </span>
  )},
  { key: 'ultimoValor', label: 'Último Valor' },
];

export function SensoresPage() {
  const [items, setItems] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Sensor | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>(INITIAL as unknown as Record<string, unknown>);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    api.get<Sensor[]>('/sensores')
      .then(setItems)
      .catch(() => showToast('Error al cargar sensores', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setValues(INITIAL as unknown as Record<string, unknown>); setShowForm(true); };
  const openEdit = (item: Sensor) => { setEditing(item); setValues(item as unknown as Record<string, unknown>); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing?.id) {
        await api.put(`/sensores/${editing.id}`, values);
        showToast('Sensor actualizado correctamente', 'success');
      } else {
        await api.post('/sensores', values);
        showToast('Sensor creado correctamente', 'success');
      }
      closeForm();
      load();
    } catch {
      showToast('Error al guardar el sensor', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este registro?')) return;
    try {
      await api.delete(`/sensores/${id}`);
      showToast('Sensor eliminado correctamente', 'success');
      load();
    } catch {
      showToast('Error al eliminar el sensor', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sensores</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión de sensores IoT</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Sensor
        </button>
      </div>
      <EntityTable
        columns={COLUMNS}
        data={items}
        onEdit={openEdit}
        onDelete={handleDelete}
        loading={loading}
        searchPlaceholder="Buscar por nombre, protocolo o estado..."
      />
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={editing ? 'Editar Sensor' : 'Nuevo Sensor'}
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
