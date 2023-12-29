import React from 'react'
import { IconButton } from '@mui/joy'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

export default function SaveCancelDropDown({ onSave, onCancel }) {
  return (
    <div>
      <IconButton type='submit' onClick={onSave}>
        <CheckIcon />
      </IconButton>
      <IconButton onClick={onCancel}>
        <ClearIcon />
      </IconButton>
    </div>
  )
}
