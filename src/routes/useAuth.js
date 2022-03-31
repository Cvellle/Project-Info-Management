import { useSelector } from 'react-redux'
import { authState } from 'features/auth/authSlice'

export const useAuth = (prop) => {
  const auth = useSelector(authState)

  return prop.authRoles.includes(auth.currentUser?.role)
    ? { status: 'authorized' }
    : auth?.jwt
    ? { status: 'unauthorized' }
    : { status: 'not logged in' }
}

export default useAuth
