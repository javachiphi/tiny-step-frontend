import React from 'react'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'
import IconButton from '@mui/joy/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

export default function TagCard({ tag, isSelected, toggleSelection }) {
  return (
    <Card
      sx={{
        width: '270px',
        margin: '8px',
        '&:hover': { boxShadow: 'md' },
      }}
    >
      <Typography level='title-lg'>{tag.note}</Typography>
      <Typography level='body-md'>{tag.description}</Typography>
      <IconButton
        onClick={toggleSelection}
        variant='outlined'
        color='neutral'
        sx={{ mr: 'auto' }}
      >
        {isSelected ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
      </IconButton>
    </Card>
  )
}
