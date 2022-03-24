import { Navigate, Outlet } from 'react-router-dom'

import useAuth from './useAuth'

const ProtectedRoutes = (authRoles) => {
  const auth = useAuth(authRoles)
  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
