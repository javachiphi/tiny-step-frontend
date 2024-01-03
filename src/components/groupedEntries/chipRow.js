import React from 'react'
import { Chip, Typography } from '@mui/joy'

export default function ChipRow({ data, tagType, filterByTagId, filterTagId }) {
  const mindTags = data.filter((tag) => tag.type === 'mind')
  const situTags = data.filter((tag) => tag.type === 'situation')
  const order = tagType === 'situation' ? mindTags : situTags

  return (
    <>
      <div className='mobile-align-column'>
        {order.map((tag) => (
          <Chip
            key={tag.id}
            onClick={() => {
              filterByTagId(tag.id)
            }}
            fontSize='md'
            color={tag.type === 'situation' ? 'primary' : 'neutral'}
            selected={tag.id === filterTagId}
          >
            {tag.note} {tag.tagcount}
          </Chip>
        ))}
      </div>
    </>
  )
}
