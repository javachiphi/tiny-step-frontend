import React, { useState } from 'react'
import GroupedEntries from '../components/groupedEntries/groupedEntries'
import { Sheet } from '@mui/joy'
import PageTitle from '../components/pageTitle'

export default function ChecklistPage() {
  const [tagType, setTagType] = useState('situation')
  const [checked, setChecked] = useState(false)

  const handleChecked = (event) => {
    setChecked(event.target.checked)
    setTagType(event.target.checked === false ? 'situation' : 'mind')
  }

  return (
    <div>
      <PageTitle
        tagType={tagType}
        title='Checklist'
        checked={checked}
        onChecked={handleChecked}
      />
      <Sheet color='primary'>
        <div className='table-container'>
          <GroupedEntries tagType={tagType} />
        </div>
      </Sheet>
    </div>
  )
}
