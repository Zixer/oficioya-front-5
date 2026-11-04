function SolicitudItem({ solicitud }) {
  return (
<article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 8 }}>
<p><strong>Solicitud #{solicitud.id}</strong></p>
<p>{solicitud.descripcion}</p>
<p>Estado: <em>{solicitud.estado}</em></p>
</article>
  );
}
 
export default SolicitudItem;