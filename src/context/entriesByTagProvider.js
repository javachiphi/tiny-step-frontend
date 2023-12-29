import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import axios from 'axios'
import { useAuthToken } from '../components/useAuthToken'
import { BACKEND_URL } from '../constants'

const EntriesByTagData = createContext({
  formattedData: null,
  dataChanged: false,
  tagDropDownOptions: null,
  setDataChanged: () => {},
  updateTagOptions: () => {},
})

export const useEntriesByTagData = () => {
  return useContext(EntriesByTagData)
}

const FormattedDataProvider = ({ children }) => {
  const [formattedData, setFormattedData] = useState(null)
  const [tagDropDownOptions, setTagDropDownOptions] = useState(null)
  const [dataChanged, setDataChanged] = useState(false)
  const jwtToken = useAuthToken()

  const updateTagOptions = (newTag) => {
    setTagDropDownOptions((prevOptions) => [...prevOptions, newTag])
  }

  const fetchData = useCallback((jwtToken) => {
    axios
      .get(`${BACKEND_URL}/entries/groupedEntriesByTag`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        const received = response.data
        let formatted = {}

        received.forEach((item) => {
          const note = item.note
          const entry = item.entries

          if (!formatted[note]) {
            formatted[note] = {
              id: item.id,
              type: item.type,
              count: 0,
              entries: [],
            }
          }

          formatted[note].entries.push(entry)
          formatted[note].count += 1
        })

        const formattedData = Object.keys(formatted).map((note) => {
          return {
            label: note,
            id: formatted[note].id,
            type: formatted[note].type,
            count: formatted[note].count,
            entries: formatted[note].entries,
          }
        })
        const tagDropDown = Object.keys(formatted).map((note) => {
          return {
            label: note,
            id: formatted[note].id,
          }
        })
        setTagDropDownOptions(tagDropDown)
        setFormattedData(formattedData)
      })
      .catch((error) => {
        console.error('Error fetching data', error)
      })
  }, [])

  const contextValue = useMemo(
    () => ({
      formattedData,
      dataChanged,
      tagDropDownOptions,
      setDataChanged,
      updateTagOptions,
    }),
    [formattedData, dataChanged, tagDropDownOptions],
  )

  // Fetch data when jwtToken changes or dataChanged is true
  useEffect(() => {
    if (jwtToken) {
      fetchData(jwtToken)
    }
  }, [jwtToken, dataChanged])

  // Reset dataChanged flag
  useEffect(() => {
    if (dataChanged) {
      setDataChanged(false)
    }
  }, [dataChanged])

  return (
    <EntriesByTagData.Provider value={contextValue}>
      {children}
    </EntriesByTagData.Provider>
  )
}

export default FormattedDataProvider
