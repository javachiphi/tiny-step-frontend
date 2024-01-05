import React from 'react'
import { Typography, Grid } from '@mui/joy'

const Section = ({ data }) => {
  const textOrder = data.imagePosition === 'right' ? 1 : 2
  const imageOrder = data.imagePosition === 'right' ? 2 : 1

  return (
    <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <Grid
        item={'true'}
        xs={12}
        md={data.imagePosition === 'column' ? 12 : 6}
        order={data.imagePosition === 'column' ? 0 : textOrder}
      >
        <Typography level='h1' component='h1' sx={{ color: '#fdf5eb' }}>
          {data.heading}
        </Typography>
        {data.isNumberedList ? (
          <ol>
            {data.content.map((listItem, index) => (
              <Typography
                key={index}
                component='h3'
                sx={{ color: '#4b5161', marginTop: '10px' }}
              >
                <li>{listItem}</li>
              </Typography>
            ))}
          </ol>
        ) : (
          <Typography
            component='p'
            sx={{ color: '#4b5161', marginTop: '10px' }}
          >
            {data.content}
          </Typography>
        )}
      </Grid>
      {data.imageUrl && (
        <Grid
          item={'true'}
          xs={12}
          md={data.imagePosition === 'column' ? 12 : 6}
          order={data.imagePosition === 'column' ? 0 : imageOrder}
        >
          <img
            src={data.imageUrl}
            alt={data.heading}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default Section
