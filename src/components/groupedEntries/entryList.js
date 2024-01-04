import React, { useState, useEffect, useMemo } from 'react'
import {
  AccordionGroup,
  Card,
  Skeleton,
  Accordion,
  AccordionSummary,
} from '@mui/joy'
import { BACKEND_URL } from '../../constants'
import { useAuthToken } from '../../context/tokenProvider'
import AccordionButtons from './accordionButtons'
import Entry from './Entry'
import axios from 'axios'

export default function EntryList({
  entries,
  loading,
  tagType,
  setDataChanged,
  newEntryId,
}) {
  const initialOpenStates = entries.reduce((states, entry) => {
    states[entry.id] = false
    return states
  }, {})

  const [openStates, setOpenStates] = useState(initialOpenStates)

  useEffect(() => {
    if (loading) return
    setOpenStates(
      entries.reduce((states, entry) => {
        states[entry.id] = states[entry.id] || false
        return states
      }, {}),
    )
    if (newEntryId) {
      console.log('new Entry Id', newEntryId)
      setOpenStates((prev) => ({ ...prev, [newEntryId]: true }))
    }
  }, [entries, loading, newEntryId])

  const [openDrawerId, setOpenDrawerId] = useState(null)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const jwtToken = useAuthToken()

  const toggleAll = (value) => {
    const newOpenStates = entries.reduce((states, entry) => {
      states[entry.id] = value
      return states
    }, {})
    setOpenStates(newOpenStates)
  }

  const handleEdit = (entry) => {
    setSelectedEntry(entry)
    setOpenDrawerId(entry.id)
  }

  const handleCloseDrawer = () => {
    setOpenDrawerId(null)
  }

  const setOpenStateForEntry = (entryId, isOpen) => {
    setOpenStates((prev) => ({ ...prev, [entryId]: isOpen }))
  }

  const handleDelete = (entryId) => {
    axios({
      url: `${BACKEND_URL}/entries/${entryId}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((response) => {
      setDataChanged(true)
    })
  }

  return (
    <Card variant='outlined' sx={{ backgroundColor: '#fdf5eb' }}>
      <AccordionButtons toggleAll={toggleAll} loading={loading} />
      {loading ? (
        Array.from(new Array(5)).map((_, index) => (
          <Accordion key={index} disabled>
            <AccordionSummary>
              <Skeleton width='100%' />
            </AccordionSummary>
          </Accordion>
        ))
      ) : (
        <>
          {entries && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AccordionGroup sx={{ maxWidth: 700 }}>
                {entries &&
                  entries.map((entry, index) => {
                    return (
                      <Entry
                        key={entry.id}
                        entry={entry}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onClose={handleCloseDrawer}
                        openDrawerId={openDrawerId}
                        selectedEntry={selectedEntry}
                        setDataChanged={setDataChanged}
                        open={
                          (openStates && openStates[entry && entry.id]) || false
                        }
                        tagType={tagType}
                        setOpen={(value) =>
                          setOpenStateForEntry(entry.id, value)
                        }
                      />
                    )
                  })}
              </AccordionGroup>
            </div>
          )}
        </>
      )}
    </Card>
  )
}
