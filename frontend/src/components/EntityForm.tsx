import { FormEvent, useState } from 'react';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date' | 'datetime-local';
  required?: boolean;
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  helpText?: string;
  min?: number;
  max?: number;
  readOnly?: boolean;
}

interface EntityFormProps {
  fields: FieldConfig[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  submitLabel?: string;
  errors?: Record<string, string>;
}

export function EntityForm({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar',
  errors = {},
}: EntityFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const getFieldError = (field: FieldConfig): string | undefined => {
    if (errors[field.name]) return errors[field.name];
    if (field.required && touched[field.name]) {
      const val = values[field.name];
      if (val === '' || val === null || val === undefined || val === 0) {
        return `${field.label} es obligatorio`;
      }
    }
    return undefined;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => {
          const error = getFieldError(field);
          const inputId = `field-${field.name}`;

          return (
            <div key={field.name} className={field.type === 'textarea' ? 'col-span-2' : ''}>
              <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'checkbox' ? (
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!values[field.name]}
                    onChange={(e) => onChange(field.name, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">{field.label}</span>
                </label>
              ) : field.type === 'select' ? (
                <select
                  id={inputId}
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => {
                    onChange(field.name, e.target.value);
                    handleBlur(field.name);
                  }}
                  onBlur={() => handleBlur(field.name)}
                  required={field.required}
                  disabled={field.readOnly}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  } ${field.readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">Seleccionar...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={inputId}
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => {
                    onChange(field.name, e.target.value);
                    handleBlur(field.name);
                  }}
                  onBlur={() => handleBlur(field.name)}
                  required={field.required}
                  placeholder={field.placeholder}
                  readOnly={field.readOnly}
                  rows={3}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  } ${field.readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
              ) : (
                <input
                  id={inputId}
                  type={field.type}
                  value={String(values[field.name] ?? '')}
                  onChange={(e) => {
                    const val = field.type === 'number' ? Number(e.target.value) : e.target.value;
                    onChange(field.name, val);
                    handleBlur(field.name);
                  }}
                  onBlur={() => handleBlur(field.name)}
                  required={field.required}
                  placeholder={field.placeholder}
                  readOnly={field.readOnly}
                  min={field.min}
                  max={field.max}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  } ${field.readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
              )}

              {field.helpText && !error && (
                <p className="mt-1 text-xs text-gray-400">{field.helpText}</p>
              )}
              {error && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
