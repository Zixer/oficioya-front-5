import { useSolicitudes } from '../hooks/useSolicitudes';
import SolicitudItem from './SolicitudItem';
import MensajeError from '../../core/components/MensajeError';
 
function SolicitudesPage() {
  const { solicitudes, cargando, error } = useSolicitudes();
 
  if (cargando) {
    return <p>Cargando solicitudes...</p>;
  }
 
  return (
<section>
<h2>Mis solicitudes</h2>
<MensajeError error={error} />
      {solicitudes.length === 0 && !error && <p>No tienes solicitudes</p>}
<ul style={{ listStyle: 'none', padding: 0 }}>
        {solicitudes.map((s) => (
<li key={s.id}>
<SolicitudItem solicitud={s} />
</li>
        ))}
</ul>
</section>
  );
}
 
export default SolicitudesPage;