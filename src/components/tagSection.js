import React, { useState, useEffect, Suspense } from 'react'
const TagDetails = React.lazy(() => import('./groupedEntries/tagDetails'))
const EntryList = React.lazy(() => import('./groupedEntries/entryList'))
const ChipRow = React.lazy(() => import('./groupedEntries/chipRow'))
import useFilteredEntries from '../api/useFilteredEntries'

export default function TagSection({
  tag,
  tagType,
  selectedTabIndex: mainTagId,
  setDataChanged,
  newEntryId,
  onResetNewEntryId
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
    setEntries(filteredEntries) // Update entries state
  }, [filteredEntries, loading])

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
      <TagDetails tag={tag} tagType={tagType} setDataChanged={setDataChanged} />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
      <ChipRow
        mainTagId={tag.id}
        tagType={tagType}
        filterByTagId={filterByTagId}
        filterTagId={tagId}
      />
      </Suspense>
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
    </>
  )
}
