import React from 'react'
import { Button, Typography } from '@mui/joy'

export default function AccordionButtons({ toggleAll, loading }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography sx={{ fontWeight: 700 }}>Solutions</Typography>
      <div className='hide-on-mobile'>
        <Button
          color='neutral'
          variant='outlined'
          disabled={loading}
          onClick={() => toggleAll(true)}
        >
          {' '}
          Open All
        </Button>
        <Button
          color='neutral'
          variant='outlined'
          disabled={loading}
          onClick={() => toggleAll(false)}
        >
          Close All
        </Button>
      </div>
    </div>
  )
}
