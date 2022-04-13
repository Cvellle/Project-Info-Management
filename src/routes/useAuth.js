import { useSelector } from 'react-redux'
import { authState } from 'features/auth/authSlice'

export const useAuth = (prop) => {
  const auth = useSelector(authState)

  return prop.authRoles.includes(auth.currentUser?.role)
}

export default useAuth
