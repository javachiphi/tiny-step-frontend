import { useState, useCallback } from 'react'

const useInputState = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const setInitialValue = useCallback((newValue) => {
    setValue(newValue)
  }, [])

  return [value, handleChange, setInitialValue, reset]
}

export default useInputState
