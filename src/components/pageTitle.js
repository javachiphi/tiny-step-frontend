import React from 'react'
import { Typography, Chip, Box } from '@mui/joy'
import { useTheme } from '@mui/joy/styles'

export default function PageTitle({ tagType, title }) {
  const theme = useTheme()
  const backgroundColor = theme.vars.palette.colors.background.main
  const textColor = theme.vars.palette.colors.text
  const chipColor = tagType === 'situation' ? 'primary' : 'neutral'

  return (
    <>
      <Box
        className='text-center'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        {tagType && (
          <Chip color={chipColor} size='lg'>
            <Typography level='h1' sx={{ color: backgroundColor }}>
              {tagType}
            </Typography>
          </Chip>
        )}
        <Typography level='h1' sx={{ color: textColor }}>
          {title}
        </Typography>
      </Box>
    </>
  )
}
