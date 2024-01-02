import React from 'react'
import { Typography, Chip, Box } from '@mui/joy'
import { useTheme } from '@mui/joy/styles'
import SwitchButton from './switchButton'

export default function PageTitle({ tagType, title, onChecked, checked }) {
  const theme = useTheme()
  const backgroundColor = theme.vars.palette.colors.background.main
  const textColor = theme.vars.palette.colors.text
  const chipColor = tagType === 'situation' ? 'primary' : 'neutral'

  return (
    <div>
      <Typography
        className='text-center'
        level='h1'
        sx={{ color: textColor, padding: '20px', marginTop: '20px' }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        {tagType && (
          <Chip color={chipColor} size='md'>
            <Typography level='h3' sx={{ color: backgroundColor }}>
              {tagType}
            </Typography>
          </Chip>
        )}
        {checked && (
          <SwitchButton checked={checked} handleChecked={onChecked} />
        )}
      </Box>
    </div>
  )
}
