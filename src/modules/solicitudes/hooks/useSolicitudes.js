import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { listarSolicitudes, cambiarEstado } from '../services/solicitudesService';

export function useSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { token } = useAuth();

  const cargarSolicitudes = useCallback(() => {
    setCargando(true);
    setError(null);
    listarSolicitudes(token)
      .then((data) => {
        setSolicitudes(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [token]);

  useEffect(() => {
    if (token) {
      cargarSolicitudes();
    }
  }, [token, cargarSolicitudes]);

  function ejecutarAccion(id, accion) {
    setError(null);
    return cambiarEstado(id, accion, token)
      .then(() => {
        cargarSolicitudes();
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return {
    solicitudes,
    error,
    cargando,
    ejecutarAccion,
    recargar: cargarSolicitudes,
  };
}