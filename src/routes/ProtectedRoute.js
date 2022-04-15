import { authState } from 'features/auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import useAuth from './useAuth'

const ProtectedRoutes = (authRoles) => {
  const authStelector = useSelector(authState)

  const auth = useAuth(authRoles)
  return auth ? <Outlet /> : <Navigate to={authStelector.currentUser === null ? '/login' : '/'} />
}

export default ProtectedRoutes
