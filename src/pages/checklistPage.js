import React from 'react'
import GroupedEntries from '../components/groupedEntries/groupedEntries'
import { Sheet } from '@mui/joy'
import PageTitle from '../components/pageTitle'

export default function ChecklistPage() {
  return (
    <div>
      <PageTitle tagType='situation' title='Checklist' />
      <Sheet color='primary'>
        <div className='table-container'>
          <GroupedEntries tagType='situation' />
        </div>
      </Sheet>
    </div>
  )
}