import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { SensorAlerta } from '../types/sensor-alerta';
import { EntityTable } from '../components/EntityTable';
import { EntityForm, FieldConfig } from '../components/EntityForm';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

const INITIAL: SensorAlerta = {
  sensorId: 0,
  valor: 0,
  umbral: 0,
  tipo: '',
  fechaAlerta: '',
  loteId: 0,
  subLoteId: 0,
};

const FIELDS: FieldConfig[] = [
  { name: 'sensorId', label: 'Sensor ID', type: 'number', required: true },
  { name: 'valor', label: 'Valor', type: 'number', required: true },
  { name: 'umbral', label: 'Umbral', type: 'number', required: true },
  { name: 'tipo', label: 'Tipo', type: 'text', required: true, placeholder: 'Ej: Temperatura alta' },
  { name: 'fechaAlerta', label: 'Fecha Alerta', type: 'datetime-local', required: true },
  { name: 'loteId', label: 'Lote ID', type: 'number', required: true },
  { name: 'subLoteId', label: 'SubLote ID', type: 'number', required: true },
];

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'sensorId', label: 'Sensor ID' },
  { key: 'tipo', label: 'Tipo', searchable: true },
  { key: 'valor', label: 'Valor' },
  { key: 'umbral', label: 'Umbral' },
  { key: 'fechaAlerta', label: 'Fecha' },
];

export function SensorAlertasPage() {
  const [items, setItems] = useState<SensorAlerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SensorAlerta | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>(INITIAL as unknown as Record<string, unknown>);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    api.get<SensorAlerta[]>('/sensor-alertas')
      .then(setItems)
      .catch(() => showToast('Error al cargar alertas', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setValues(INITIAL as unknown as Record<string, unknown>); setShowForm(true); };
  const openEdit = (item: SensorAlerta) => { setEditing(item); setValues(item as unknown as Record<string, unknown>); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing?.id) {
        await api.put(`/sensor-alertas/${editing.id}`, values);
        showToast('Alerta actualizada correctamente', 'success');
      } else {
        await api.post('/sensor-alertas', values);
        showToast('Alerta creada correctamente', 'success');
      }
      closeForm();
      load();
    } catch {
      showToast('Error al guardar la alerta', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este registro?')) return;
    try {
      await api.delete(`/sensor-alertas/${id}`);
      showToast('Alerta eliminada correctamente', 'success');
      load();
    } catch {
      showToast('Error al eliminar la alerta', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sensor Alertas</h1>
          <p className="text-sm text-gray-500 mt-1">Alertas generadas por sensores</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Alerta
        </button>
      </div>
      <EntityTable
        columns={COLUMNS}
        data={items}
        onEdit={openEdit}
        onDelete={handleDelete}
        loading={loading}
        searchPlaceholder="Buscar por tipo de alerta..."
      />
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={editing ? 'Editar Alerta' : 'Nueva Alerta'}
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
