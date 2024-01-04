import React, { useState, useEffect } from 'react'
import TagDetails from './groupedEntries/tagDetails'
import EntryList from './groupedEntries/entryList'
import useFilteredEntries from '../api/useFilteredEntries'
import ChipRow from './groupedEntries/chipRow'

export default function TagSection({
  tag,
  tagType,
  selectedTabIndex: mainTagId,
  setDataChanged,
  newEntryId,
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

  useEffect(() => {
    setEntries(filteredEntries) // Update entries state
  }, [filteredEntries, loading])

  return (
    <>
      <TagDetails tag={tag} tagType={tagType} setDataChanged={setDataChanged} />
      <ChipRow
        mainTagId={tag.id}
        tagType={tagType}
        filterByTagId={filterByTagId}
        filterTagId={tagId}
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
