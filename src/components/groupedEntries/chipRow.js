import React, { useEffect, useState } from 'react'
import { Chip, Typography } from '@mui/joy'
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
  const oppositeType = tagType === 'situation' ? 'mindset' : 'situation'

  return (
    <>
      <Typography color='neutral' level='body-sm' fontWeight='xl'>
        {oppositeType}
      </Typography>
      <div className='mobile-align-column' style={{ marginBottom: '20px' }}>
        <Chip
          selected={mainTagId === selected}
          className='custom-chip'
          color={oppositeType === 'situation' ? 'secondary' : 'tertiary'}
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
            className='custom-chip'
            fontSize='md'
            color={tag.type === 'situation' ? 'secondary' : 'tertiary'}
            selected={tag.id === selected}
          >
            {tag.note} {tag.tagcount}
          </Chip>
        ))}
      </div>
    </>
  )
}
