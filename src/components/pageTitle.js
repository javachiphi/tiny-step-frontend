import React from 'react'
import { Typography, Chip, Box } from '@mui/joy'
import { useTheme } from '@mui/joy/styles'
import SwitchButton from './switchButton'

export default function PageTitle({ tagType, title, onChecked, checked }) {
  const theme = useTheme()
  const vanillaColor = theme.vars.palette.colors.background.main
  const textColor = theme.vars.palette.colors.text
  const chipColor = tagType === 'situation' ? '#F9B917' : '#52b6de'

  return (
    <div>
      <Typography
        className='text-center'
        level='h2'
        sx={{
          color: textColor,
          padding: '15px',
          marginTop: '20px',
          fontWeight: '900',
        }}
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
          <Chip size='md' sx={{ backgroundColor: chipColor }}>
            <Typography level='h2' sx={{ color: vanillaColor }}>
              {tagType}
            </Typography>
          </Chip>
        )}
        {onChecked && (
          <SwitchButton checked={checked} handleChecked={onChecked} />
        )}
      </Box>
    </div>
  )
}
