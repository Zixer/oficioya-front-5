import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { listarSolicitudes } from '../services/solicitudesService';
 
export function useSolicitudes() {
  const { token, logout } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    listarSolicitudes(token).then((datos) => setSolicitudes(datos)).catch((e) => {
        if (e.status === 401) {
          logout();                   
        } else {
          setError(e.message);
        }
      })
      .finally(() => setCargando(false));
  }, [token, logout]);
 
  return { solicitudes, cargando, error };
}