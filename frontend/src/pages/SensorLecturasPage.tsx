import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { SensorLectura } from '../types/sensor-lectura';
import { EntityTable } from '../components/EntityTable';
import { EntityForm, FieldConfig } from '../components/EntityForm';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

const INITIAL: SensorLectura = {
  sensorId: 0,
  valor: '',
  fechaLectura: '',
  unidad: '',
  observaciones: '',
};

const FIELDS: FieldConfig[] = [
  { name: 'sensorId', label: 'Sensor ID', type: 'number', required: true },
  { name: 'valor', label: 'Valor', type: 'text', required: true, placeholder: 'Ej: 25.5' },
  { name: 'fechaLectura', label: 'Fecha Lectura', type: 'datetime-local', required: true },
  { name: 'unidad', label: 'Unidad', type: 'text', required: true, placeholder: '°C, %, hPa...' },
  { name: 'observaciones', label: 'Observaciones', type: 'textarea', placeholder: 'Notas adicionales...' },
];

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'sensorId', label: 'Sensor ID' },
  { key: 'valor', label: 'Valor' },
  { key: 'unidad', label: 'Unidad' },
  { key: 'fechaLectura', label: 'Fecha' },
  { key: 'observaciones', label: 'Observaciones', searchable: true },
];

export function SensorLecturasPage() {
  const [items, setItems] = useState<SensorLectura[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SensorLectura | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>(INITIAL as unknown as Record<string, unknown>);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    api.get<SensorLectura[]>('/sensor-lecturas')
      .then(setItems)
      .catch(() => showToast('Error al cargar lecturas', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setValues(INITIAL as unknown as Record<string, unknown>); setShowForm(true); };
  const openEdit = (item: SensorLectura) => { setEditing(item); setValues(item as unknown as Record<string, unknown>); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing?.id) {
        await api.put(`/sensor-lecturas/${editing.id}`, values);
        showToast('Lectura actualizada correctamente', 'success');
      } else {
        await api.post('/sensor-lecturas', values);
        showToast('Lectura creada correctamente', 'success');
      }
      closeForm();
      load();
    } catch {
      showToast('Error al guardar la lectura', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este registro?')) return;
    try {
      await api.delete(`/sensor-lecturas/${id}`);
      showToast('Lectura eliminada correctamente', 'success');
      load();
    } catch {
      showToast('Error al eliminar la lectura', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sensor Lecturas</h1>
          <p className="text-sm text-gray-500 mt-1">Registro de lecturas de sensores</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Lectura
        </button>
      </div>
      <EntityTable
        columns={COLUMNS}
        data={items}
        onEdit={openEdit}
        onDelete={handleDelete}
        loading={loading}
        searchPlaceholder="Buscar por observaciones..."
      />
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={editing ? 'Editar Lectura' : 'Nueva Lectura'}
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
