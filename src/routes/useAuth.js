export const useAuth = (prop) => {
  return prop.authRoles.split(',').includes('admin')
}

export default useAuth
