import React, { useState } from 'react'
import { Sheet, Snackbar } from '@mui/joy'
import { useLocation } from 'react-router-dom'
import { useSnackbar } from '../context/snackbarProvider'
import GroupedEntries from '../components/groupedEntries/groupedEntries'
import PageTitle from '../components/pageTitle'

export default function ReflectPage() {
  const [tagType, setTagType] = useState('situation')
  const [checked, setChecked] = useState(false)
  const location = useLocation()
  const { newEntryId: newlyCreatedId, newEntryTags } = location.state || {}
  const [newEntryId, setNewEntryId] = useState(newlyCreatedId)
  const { snackbarOpen, hideSnackbar } = useSnackbar()

  const handleChecked = (event) => {
    setChecked(event.target.checked)
    setTagType(event.target.checked === false ? 'situation' : 'mind')
  }

  const handleResetNewEntryId = () => {
    setNewEntryId(null)
  }
  return (
    <div>
      <PageTitle
        tagType={tagType}
        title='Reflect'
        checked={checked}
        onChecked={handleChecked}
      />

      <Sheet color='primary'>
        <div className='table-container'>
          <GroupedEntries
            tagType={tagType}
            newEntryId={newEntryId}
            onResetNewEntryId={handleResetNewEntryId}
            newEntryTags={newEntryTags}
            mode='reflect'
          />
        </div>
      </Sheet>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        onClose={hideSnackbar}
        autoHideDuration={3000}
        size='lg'
        variant='soft'
        color='success'
      >
        Updated. Find added reflection on Remind Page.
      </Snackbar>
    </div>
  )
}
