import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from './useAuth'

const ProtectedRoutes = (authRoles) => {
  const auth = useAuth(authRoles)
  const location = useLocation()

  if (auth.status === 'authorized') {
    return <Outlet />
  } else if (auth.status === 'unauthorized') {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

export default ProtectedRoutes
