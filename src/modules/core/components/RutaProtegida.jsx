import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import Navbar from './Navbar';
 
// Si no hay sesión, redirige al login
function RutaProtegida() {
  const { token } = useAuth();
 
  if (!token) {
    return <Navigate to="/login" replace />;
  }
 
  return (
<>
<Navbar />
<main style={{ padding: 16 }}>
<Outlet />
</main>
</>
  );
}
 
export default RutaProtegida;