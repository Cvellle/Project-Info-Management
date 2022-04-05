import React from 'react'

export const useWillUnmount = (onUnmountHandler) => {
  React.useEffect(
    () => () => {
      onUnmountHandler()
    },
    []
  )
}
