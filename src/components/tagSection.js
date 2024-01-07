import React, { useState, useEffect, Suspense } from 'react'
const TagDetails = React.lazy(() => import('./groupedEntries/tagDetails'))
const EntryList = React.lazy(() => import('./groupedEntries/entryList'))
const ChipRow = React.lazy(() => import('./groupedEntries/chipRow'))
import useFilteredEntries from '../api/useFilteredEntries'
import { Typography } from '@mui/joy'

export default function TagSection({
  tag,
  tagType,
  selectedTabIndex: mainTagId,
  setDataChanged,
  newEntryId,
  onResetNewEntryId,
  mode
}) {
  const [tagId, setTagId] = useState([mainTagId])

  const { filteredEntries, loading } = useFilteredEntries({
    tagId,
  })

  const [entries, setEntries] = useState(filteredEntries)
  const filterByTagId = (newTagId) => {
    if (newTagId === mainTagId) {
      setTagId([mainTagId])
    } else {
      setTagId([mainTagId, newTagId])
    }
  }
  // implement pagination entries?page={1}&limit={10}&tagId={1} (make it not possible if two tagIds)

  useEffect(() => {
    let entries 
    if(mode === 'reflect') {
      entries = filteredEntries.filter((entry) => !entry.solution)
    } else {
      entries = filteredEntries.filter((entry) => entry.solution)
    }
    setEntries(entries) // Update entries state
  }, [filteredEntries, loading])

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
      <TagDetails tag={tag} tagType={tagType} setDataChanged={setDataChanged} />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
      {mode === 'reflect' ? null : (
          <ChipRow
          mainTagId={tag.id}
          tagType={tagType}
          filterByTagId={filterByTagId}
          filterTagId={tagId}
        />
        )}
      </Suspense>

      {mode === 'reflect' && entries.length === 0 && !loading ? (
        <Typography
          variant='body-sm'
          style={{ textAlign: 'center', marginTop: '20px' }}
        >Nothing to reflect</Typography>
      ): (
        <Suspense fallback={<div>loading...</div>}>
          <EntryList
          entries={entries}
          loading={loading}
          tagType={tagType}
          setDataChanged={setDataChanged}
          newEntryId={newEntryId}
          onResetNewEntryId={onResetNewEntryId}
          />
      </Suspense> 
      )}
    </>
  )
}
