const useCallback2 = (callback) => {
  const fn = uesRef()

  const res = useCallback(() => {
    fn.current()
  }, [])

  fn.current = () => {
    callback()
  }

  return res
}

