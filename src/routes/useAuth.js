import { useSelector } from 'react-redux'

import { authState } from 'features/auth/authSlice'

export const useAuth = (prop) => {
  const authSelector = useSelector(authState)
  let returnBoolean =
    authSelector && authSelector.currentUser.role
      ? prop.authRoles.includes(authSelector.currentUser.role)
      : false
  return returnBoolean
}

export default useAuth
