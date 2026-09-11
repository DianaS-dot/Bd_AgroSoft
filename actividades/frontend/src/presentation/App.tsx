import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Leaf,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import type { Actividad, ActividadFormValues } from '../domain/actividad';
import { ActividadService } from '../application/actividadService';
import { ActividadHttpRepository } from '../infrastructure/http/actividadHttpRepository';

const initialForm: ActividadFormValues = {
  titulo: '',
  descripcion: '',
  tipo_actividad: 'siembra',
  estado: 'pendiente',
  prioridad: 'media',
  fecha_programada: '',
  fecha_inicio: '',
  fecha_fin: '',
  id_cultivo_real: '',
};

const estados = ['pendiente', 'en_proceso', 'completada', 'cancelada'];
const prioridades = ['baja', 'media', 'alta'];
const tipos = ['siembra', 'riego', 'fertilizacion', 'cosecha', 'mantenimiento', 'control_plagas'];

const actividadService = new ActividadService(new ActividadHttpRepository());

export function App() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [form, setForm] = useState<ActividadFormValues>(initialForm);
  const [selected, setSelected] = useState<Actividad | null>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const filteredActividades = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return actividades;

    return actividades.filter((actividad) =>
      [actividad.titulo, actividad.descripcion, actividad.tipo_actividad, actividad.estado, actividad.prioridad]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search)),
    );
  }, [actividades, query]);

  const stats = useMemo(() => {
    return {
      total: actividades.length,
      pendientes: actividades.filter((actividad) => actividad.estado === 'pendiente').length,
      proceso: actividades.filter((actividad) => actividad.estado === 'en_proceso').length,
      completadas: actividades.filter((actividad) => actividad.estado === 'completada').length,
    };
  }, [actividades]);

  useEffect(() => {
    void loadActividades();
  }, []);

  async function loadActividades() {
    try {
      setLoading(true);
      setError('');
      setActividades(await actividadService.findAll());
    } catch {
      setError('No se pudo conectar con el backend de actividades.');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(actividad: Actividad) {
    setSelected(actividad);
    setForm({
      titulo: actividad.titulo ?? '',
      descripcion: actividad.descripcion ?? '',
      tipo_actividad: actividad.tipo_actividad ?? 'siembra',
      estado: actividad.estado ?? 'pendiente',
      prioridad: actividad.prioridad ?? 'media',
      fecha_programada: toInputDate(actividad.fecha_programada),
      fecha_inicio: toInputDate(actividad.fecha_inicio),
      fecha_fin: toInputDate(actividad.fecha_fin),
      id_cultivo_real: actividad.id_cultivo_real ? String(actividad.id_cultivo_real) : '',
    });
  }

  function resetForm() {
    setSelected(null);
    setForm(initialForm);
    setError('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.titulo.trim() || !form.tipo_actividad.trim()) {
      setError('Titulo y tipo de actividad son obligatorios.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      if (selected) {
        await actividadService.update(selected.id_actividad, form);
      } else {
        await actividadService.create(form);
      }

      resetForm();
      await loadActividades();
    } catch {
      setError('No fue posible guardar la actividad. Revisa los datos o la conexion.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const shouldDelete = window.confirm('Deseas eliminar esta actividad?');
    if (!shouldDelete) return;

    try {
      setError('');
      await actividadService.remove(id);
      await loadActividades();
      if (selected?.id_actividad === id) resetForm();
    } catch {
      setError('No fue posible eliminar la actividad.');
    }
  }

  return (
    <main className="min-h-screen bg-agro-50 text-agro-950">
      <section className="border-b border-agro-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-agro-900 text-white shadow-soft">
              <Leaf size={26} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-agro-700">AgroSoft</p>
              <h1 className="text-2xl font-bold text-agro-950 md:text-3xl">Modulo de actividades</h1>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => void loadActividades()} type="button">
            <RefreshCw size={18} />
            Actualizar
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 md:grid-cols-4">
        <StatCard icon={<ClipboardList />} label="Total" value={stats.total} />
        <StatCard icon={<CalendarDays />} label="Pendientes" value={stats.pendientes} />
        <StatCard icon={<RefreshCw />} label="En proceso" value={stats.proceso} />
        <StatCard icon={<CheckCircle2 />} label="Completadas" value={stats.completadas} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-8 lg:grid-cols-[minmax(320px,420px)_1fr]">
        <form className="panel space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">{selected ? 'Editar actividad' : 'Nueva actividad'}</h2>
            {selected && (
              <button className="icon-btn" onClick={resetForm} title="Cancelar edicion" type="button">
                <X size={18} />
              </button>
            )}
          </div>

          <Field label="Titulo">
            <input
              className="input"
              value={form.titulo}
              onChange={(event) => setForm({ ...form, titulo: event.target.value })}
              placeholder="Ej. Riego lote norte"
            />
          </Field>

          <Field label="Descripcion">
            <textarea
              className="input min-h-24 resize-none"
              value={form.descripcion}
              onChange={(event) => setForm({ ...form, descripcion: event.target.value })}
              placeholder="Detalle operativo de la actividad"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tipo">
              <select
                className="input"
                value={form.tipo_actividad}
                onChange={(event) => setForm({ ...form, tipo_actividad: event.target.value })}
              >
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {formatLabel(tipo)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Cultivo real">
              <input
                className="input"
                type="number"
                min="1"
                value={form.id_cultivo_real}
                onChange={(event) => setForm({ ...form, id_cultivo_real: event.target.value })}
                placeholder="ID"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Estado">
              <select
                className="input"
                value={form.estado}
                onChange={(event) => setForm({ ...form, estado: event.target.value })}
              >
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {formatLabel(estado)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Prioridad">
              <select
                className="input"
                value={form.prioridad}
                onChange={(event) => setForm({ ...form, prioridad: event.target.value })}
              >
                {prioridades.map((prioridad) => (
                  <option key={prioridad} value={prioridad}>
                    {formatLabel(prioridad)}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Programada">
              <input
                className="input"
                type="date"
                value={form.fecha_programada}
                onChange={(event) => setForm({ ...form, fecha_programada: event.target.value })}
              />
            </Field>
            <Field label="Inicio">
              <input
                className="input"
                type="date"
                value={form.fecha_inicio}
                onChange={(event) => setForm({ ...form, fecha_inicio: event.target.value })}
              />
            </Field>
            <Field label="Fin">
              <input
                className="input"
                type="date"
                value={form.fecha_fin}
                onChange={(event) => setForm({ ...form, fecha_fin: event.target.value })}
              />
            </Field>
          </div>

          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}

          <button className="btn btn-primary w-full" disabled={saving} type="submit">
            {selected ? <Pencil size={18} /> : <Plus size={18} />}
            {saving ? 'Guardando...' : selected ? 'Guardar cambios' : 'Crear actividad'}
          </button>
        </form>

        <div className="panel">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-bold">Actividades registradas</h2>
            <label className="relative w-full md:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-agro-700" size={18} />
              <input
                className="input pl-10"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar actividad"
              />
            </label>
          </div>

          {loading ? (
            <div className="empty-state">Cargando actividades...</div>
          ) : filteredActividades.length === 0 ? (
            <div className="empty-state">No hay actividades para mostrar.</div>
          ) : (
            <div className="grid gap-4">
              {filteredActividades.map((actividad) => (
                <article className="activity-card" key={actividad.id_actividad}>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="badge badge-dark">#{actividad.id_actividad}</span>
                      <span className="badge">{formatLabel(actividad.estado)}</span>
                      <span className="badge badge-light">{formatLabel(actividad.prioridad)}</span>
                    </div>
                    <h3 className="truncate text-lg font-bold text-agro-950">{actividad.titulo}</h3>
                    <p className="mt-1 text-sm text-agro-800">{actividad.descripcion || 'Sin descripcion'}</p>
                    <div className="mt-3 grid gap-2 text-sm text-agro-800 sm:grid-cols-2 xl:grid-cols-4">
                      <Info label="Tipo" value={formatLabel(actividad.tipo_actividad)} />
                      <Info label="Programada" value={formatDate(actividad.fecha_programada)} />
                      <Info label="Inicio" value={formatDate(actividad.fecha_inicio)} />
                      <Info label="Fin" value={formatDate(actividad.fecha_fin)} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-agro-700">
                      <span>{actividad.responsables?.length ?? 0} responsables</span>
                      <span>{actividad.evidencias?.length ?? 0} evidencias</span>
                      <span>{actividad.servicios?.length ?? 0} servicios</span>
                      <span>{actividad.herramientas?.length ?? 0} herramientas</span>
                      <span>{actividad.historial?.length ?? 0} historial</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className="icon-btn" onClick={() => handleEdit(actividad)} title="Editar" type="button">
                      <Pencil size={18} />
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => void handleDelete(actividad.id_actividad)}
                      title="Eliminar"
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-agro-900">
      {label}
      {children}
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase text-agro-600">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="panel flex items-center gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-agro-100 text-agro-800">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-agro-700">{label}</p>
        <p className="text-2xl font-bold text-agro-950">{value}</p>
      </div>
    </div>
  );
}

function formatLabel(value?: string) {
  return value ? value.replaceAll('_', ' ') : 'Sin dato';
}

function formatDate(value?: string) {
  return value ? new Date(`${value}T00:00:00`).toLocaleDateString('es-CO') : 'Sin fecha';
}

function toInputDate(value?: string) {
  return value ? value.slice(0, 10) : '';
}
