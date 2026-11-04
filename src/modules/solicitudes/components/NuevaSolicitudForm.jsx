import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { crearSolicitud } from '../services/solicitudesService';
import Boton from '../../core/design-system/Boton';
import MensajeError from '../../core/components/MensajeError';

function NuevaSolicitudForm({ trabajadorId }) {
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setError(null);
    setCargando(true);
    try {
      await crearSolicitud({ trabajadorId, descripcion }, token);
      navigate('/solicitudes');
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={manejarEnvio} style={{ display: 'grid', gap: 12, maxWidth: 400, marginTop: 16 }}>
      <h3>Solicitar servicio</h3>
      <label>
        Descripción de la necesidad:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          required
          placeholder="Describe brevemente el servicio que requieres..."
        />
      </label>
      <MensajeError error={error} />
      <Boton type="submit" disabled={cargando}>
        {cargando ? 'Enviando...' : 'Enviar solicitud'}
      </Boton>
    </form>
  );
}

export default NuevaSolicitudForm;
