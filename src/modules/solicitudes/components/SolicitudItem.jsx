import Boton from '../../core/design-system/Boton';

function SolicitudItem({ solicitud, rol, onAccion }) {
  const pendiente = solicitud.estado === 'PENDIENTE';
  const aceptada = solicitud.estado === 'ACEPTADA';

  return (
    <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 8 }}>
      <p><strong>Solicitud #{solicitud.id}</strong></p>
      <p>{solicitud.descripcion}</p>
      <p>Estado: <em>{solicitud.estado}</em></p>

      {rol === 'TRABAJADOR' && pendiente && (
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Boton onClick={() => onAccion(solicitud.id, 'aceptar')}>Aceptar</Boton>
          <Boton variante="secundario" onClick={() => onAccion(solicitud.id, 'rechazar')}>Rechazar</Boton>
        </div>
      )}

      {rol === 'CONTRATANTE' && (pendiente || aceptada) && (
        <div style={{ marginTop: 8 }}>
          <Boton variante="secundario" onClick={() => onAccion(solicitud.id, 'cancelar')}>Cancelar</Boton>
        </div>
      )}
    </article>
  );
}

export default SolicitudItem;