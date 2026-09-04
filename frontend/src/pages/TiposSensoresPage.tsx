import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { TipoSensor } from '../types/tipo-sensor';
import { EntityTable } from '../components/EntityTable';
import { EntityForm, FieldConfig } from '../components/EntityForm';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

const INITIAL: TipoSensor = {
  nombre: '',
  unidad: '',
  decimales: 0,
  descripcion: '',
  imagen: '',
  ttlMinutos: 0,
};

const FIELDS: FieldConfig[] = [
  { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej: Temperatura' },
  { name: 'unidad', label: 'Unidad', type: 'text', required: true, placeholder: 'Ej: °C' },
  { name: 'decimales', label: 'Decimales', type: 'number', required: true, min: 0, max: 10 },
  { name: 'descripcion', label: 'Descripción', type: 'textarea', placeholder: 'Descripción del tipo de sensor...' },
  { name: 'imagen', label: 'Imagen (URL)', type: 'text', placeholder: 'https://...' },
  { name: 'ttlMinutos', label: 'TTL Minutos', type: 'number', min: 0, helpText: 'Tiempo de vida en minutos' },
];

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre', searchable: true },
  { key: 'unidad', label: 'Unidad' },
  { key: 'decimales', label: 'Decimales' },
  { key: 'descripcion', label: 'Descripción', searchable: true },
  { key: 'ttlMinutos', label: 'TTL Min' },
];

export function TiposSensoresPage() {
  const [items, setItems] = useState<TipoSensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TipoSensor | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>(INITIAL as unknown as Record<string, unknown>);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    api.get<TipoSensor[]>('/tipos-sensores')
      .then(setItems)
      .catch(() => showToast('Error al cargar tipos de sensores', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setValues(INITIAL as unknown as Record<string, unknown>); setShowForm(true); };
  const openEdit = (item: TipoSensor) => { setEditing(item); setValues(item as unknown as Record<string, unknown>); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing?.id) {
        await api.put(`/tipos-sensores/${editing.id}`, values);
        showToast('Tipo de sensor actualizado correctamente', 'success');
      } else {
        await api.post('/tipos-sensores', values);
        showToast('Tipo de sensor creado correctamente', 'success');
      }
      closeForm();
      load();
    } catch {
      showToast('Error al guardar el tipo de sensor', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este registro?')) return;
    try {
      await api.delete(`/tipos-sensores/${id}`);
      showToast('Tipo de sensor eliminado correctamente', 'success');
      load();
    } catch {
      showToast('Error al eliminar el tipo de sensor', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tipos de Sensores</h1>
          <p className="text-sm text-gray-500 mt-1">Categorías de sensores disponibles</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Tipo
        </button>
      </div>
      <EntityTable
        columns={COLUMNS}
        data={items}
        onEdit={openEdit}
        onDelete={handleDelete}
        loading={loading}
        searchPlaceholder="Buscar por nombre o descripción..."
      />
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={editing ? 'Editar Tipo Sensor' : 'Nuevo Tipo Sensor'}
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
