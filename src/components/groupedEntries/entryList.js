import React, { useState } from 'react'
import { AccordionGroup, Typography, Button, Card } from '@mui/joy'
import { BACKEND_URL } from '../../constants'
import { useAuthToken } from '../../context/tokenProvider'
import Entry from './Entry'
import axios from 'axios'

export default function EntryList({ entries, tagType, setDataChanged }) {
  const initialStates = entries.reduce((states, entry) => {
    states[entry.id] = false
    return states
  }, {})

  const [openStates, setOpenStates] = useState(initialStates)
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
                    open={openStates[entry.id]}
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
