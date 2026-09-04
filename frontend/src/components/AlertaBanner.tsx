import type { Producto } from '../App';

interface Props {
  productos: Producto[];
}

export function AlertaBanner({ productos }: Props) {
  const productosBajos = productos.filter(
    (p) => p.cantidad <= p.stockMinimo
  );

  if (productosBajos.length === 0) return null;

  const listaNombres = productosBajos.map((p) => p.nombre).join(', ');

  return (
    <div className="alerta-banner animate-fadeIn">
      <span className="alerta-banner-icon">⚠️</span>
      <div>
        <p className="alerta-banner-title">Alertas de stock</p>
        <p className="alerta-banner-body">
          <strong>{listaNombres}</strong> requieren atención.
        </p>
      </div>
    </div>
  );
}

export default AlertaBanner;
