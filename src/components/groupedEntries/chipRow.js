import React, { useEffect, useState } from 'react'
import { Chip } from '@mui/joy'
import { fetchData } from '../../api/apiService'
import { useAuthToken } from '../../context/tokenProvider'

export default function ChipRow({
  mainTagId,
  tagType,
  filterByTagId,
  filterTagId: filter,
}) {
  const jwtToken = useAuthToken()
  const [assocEntryTags, setAssocEntryTags] = useState([])

  useEffect(() => {
    if (!jwtToken) return
    fetchData(`tags/${mainTagId}/assocEntryTagsCount`, jwtToken).then(
      (data) => {
        const oppositeType = tagType === 'situation' ? 'mind' : 'situation'
        const filterType = data.filter((item) => oppositeType === item.type)
        setAssocEntryTags(filterType)
      },
    )
  }, [mainTagId, tagType, jwtToken])

  const selected = filter.length === 1 ? filter[0] : filter[1]

  return (
    <>
      <div className='mobile-align-column' style={{ marginBottom: '20px' }}>
        <Chip
          selected={mainTagId === selected}
          onClick={() => {
            filterByTagId(mainTagId)
          }}
        >
          View All
        </Chip>
        {assocEntryTags.map((tag) => (
          <Chip
            key={tag.id}
            onClick={() => {
              filterByTagId(tag.id)
            }}
            fontSize='md'
            color={tag.type === 'situation' ? 'primary' : 'neutral'}
            selected={tag.id === selected}
          >
            {tag.note} {tag.tagcount}
          </Chip>
        ))}
      </div>
    </>
  )
}
