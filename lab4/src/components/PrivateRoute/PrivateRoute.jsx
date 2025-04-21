import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PrivateRoute;