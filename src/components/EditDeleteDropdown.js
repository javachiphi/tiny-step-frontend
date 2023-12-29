import React from 'react'
import { IconButton, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy'
import { MoreHoriz } from '@mui/icons-material'

export default function EditDeleteDropDown({
  onDelete,
  contentId,
  tagType,
  onEdit,
  content,
}) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
        sx={{ width: '20px' }}
      >
        <MoreHoriz color='neutral' />
        {/* edit */}
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => onEdit(content)}>Reflect</MenuItem>
        <MenuItem onClick={() => onDelete(contentId, tagType)}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  )
}
