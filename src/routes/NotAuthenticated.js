import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authState } from 'features/auth/authSlice'

export const NotAuthenticated = () => {
  const auth = useSelector(authState)

  const location = useLocation()

  return auth?.jwt ? <Navigate to="/404" state={{ from: location }} replace /> : <Outlet />
}
