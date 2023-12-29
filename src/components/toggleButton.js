import React from 'react'
import { Switch, Typography } from '@mui/joy'

export default function ToggleButton({ checked, handleChecked }) {
  return (
    <Switch
      color='success'
      checked={checked}
      onChange={handleChecked}
      size='lg'
      slotProps={{
        track: {
          children: (
            <React.Fragment>
              <Typography component='span' level='inherit' sx={{ ml: '8px' }}>
                On
              </Typography>
              <Typography component='span' level='inherit' sx={{ mr: '8px' }}>
                Off
              </Typography>
            </React.Fragment>
          ),
        },
      }}
      sx={{
        '--Switch-thumbSize': '27px',
        '--Switch-trackWidth': '64px',
        '--Switch-trackHeight': '31px',
      }}
    />
  )
}
