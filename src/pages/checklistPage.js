import React, { useState, Suspense } from 'react'
import { Sheet } from '@mui/joy'
import { useLocation } from 'react-router-dom'
const PageTitle = React.lazy(() => import('../components/pageTitle'))
const GroupedEntries = React.lazy(() => import('../components/groupedEntries/groupedEntries'))

export default function ChecklistPage() {
  const [tagType, setTagType] = useState('situation')
  const [checked, setChecked] = useState(false)
  const location = useLocation()
  const { newEntryId, newEntryTags } = location.state || {}

  const handleChecked = (event) => {
    setChecked(event.target.checked)
    setTagType(event.target.checked === false ? 'situation' : 'mind')
  }

  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <PageTitle
          tagType={tagType}
          title='Checklist'
          checked={checked}
          onChecked={handleChecked}
        />
      </Suspense>
      <Sheet color='primary'>
        <div className='table-container'>
          <Suspense fallback={<div>loading...</div>}>
          <GroupedEntries
            tagType={tagType}
            newEntryId={newEntryId}
            newEntryTags={newEntryTags}
          />
          </Suspense>
        </div>
      </Sheet>
    </div>
  )
}
