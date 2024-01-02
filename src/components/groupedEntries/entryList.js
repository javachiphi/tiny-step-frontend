import React, { useState, useEffect } from 'react'
import { AccordionGroup, Typography, Button, Card } from '@mui/joy'
import { BACKEND_URL } from '../../constants'
import { useAuthToken } from '../../context/tokenProvider'
import Entry from './Entry'
import axios from 'axios'
import useFilteredEntries from '../../api/useFilteredEntries'

export default function EntryList({
  tagType,
  setDataChanged,
  newEntryId,
  tagId,
}) {
  const { filteredEntries: entries, loading } = useFilteredEntries({
    tagId,
  })

  useEffect(() => {
    if (!tagId) return
    if (loading === false && entries.length > 0) {
      const initialStates = entries.reduce((states, entry) => {
        states[entry.id] = false
        return states
      }, {})
      setOpenStates(initialStates)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagId])

  const [openStates, setOpenStates] = useState(null)
  const [openDrawerId, setOpenDrawerId] = useState(null)

  const [selectedEntry, setSelectedEntry] = useState(null)
  const jwtToken = useAuthToken()

  useEffect(() => {
    if (newEntryId) {
      setOpenStates((prev) => ({ ...prev, [newEntryId]: true }))
    }
  }, [newEntryId])

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

  if (loading) return <div>Loading...</div>
  return (
    <Card variant='outlined' sx={{ backgroundColor: '#fdf5eb' }}>
      {entries && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 700 }}>Solutions</Typography>
            <div className='hide-on-mobile'>
              <Button
                color='neutral'
                variant='outlined'
                onClick={() => toggleAll(true)}
              >
                {' '}
                Open All
              </Button>
              <Button
                color='neutral'
                variant='outlined'
                onClick={() => toggleAll(false)}
              >
                Close All
              </Button>
            </div>
          </div>
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
                    open={openStates && openStates[entry && entry.id]}
                    tagType={tagType}
                    setOpen={(value) => setOpenStateForEntry(entry.id, value)}
                  />
                )
              })}
          </AccordionGroup>
        </div>
      )}
    </Card>
  )
}
