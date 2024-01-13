import React, { useState, Suspense } from 'react'
import { Sheet } from '@mui/joy'
import { useLocation } from 'react-router-dom'
import PageTitle from '../components/pageTitle'
import GroupedEntries from '../components/groupedEntries/groupedEntries'

export default function ChecklistPage() {
  const [tagType, setTagType] = useState('situation')
  const [checked, setChecked] = useState(false)
  const location = useLocation()
  const { newEntryId: newlyCreatedId, newEntryTags } = location.state || {}
  const [newEntryId, setNewEntryId] = useState(newlyCreatedId)

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
        title='Remind'
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
          />
        </div>
      </Sheet>
    </div>
  )
}
