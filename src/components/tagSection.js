import React, { useState, useEffect } from 'react'
import TagDetails from './groupedEntries/tagDetails'
import EntryList from './groupedEntries/entryList'
import useFilteredEntries from '../api/useFilteredEntries'

export default function TagSection({
  tag,
  tagType,
  selectedTabIndex,
  setDataChanged,
  newEntryId,
}) {
  const [tagId, setTagId] = useState(null)

  const { filteredEntries, loading } = useFilteredEntries({
    tagId: tagId ? `${selectedTabIndex},${tagId}` : `${selectedTabIndex}`,
  })

  const [entries, setEntries] = useState(filteredEntries)
  const filterByTagId = (newTagId) => {
    setTagId(newTagId)
  }

  useEffect(() => {
    setEntries(filteredEntries) // Update entries state
  }, [filteredEntries, loading])

  return (
    <>
      <TagDetails
        tag={tag}
        tagType={tagType}
        filterTagId={tagId} //
        setDataChanged={setDataChanged}
        filterByTagId={filterByTagId}
      />
      <EntryList
        entries={entries}
        loading={loading}
        tagType={tagType}
        setDataChanged={setDataChanged}
        newEntryId={newEntryId}
      />
    </>
  )
}
