import React from 'react'
import { Typography, Grid, Card, CardContent } from '@mui/joy'

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
          <div>
            {data.content.map((content, index) => (
              <Card
                key={index}
                orientation='horizontal'
                variant='outlined'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                  backgroundColor: data.backgroundColor,
                  textAlign: 'left',
                }}
              >
                <Typography level='body' sx={{ fontWeight: '900' }}>
                  {content.title}
                </Typography>
                <Typography component='body-xs' sx={{ color: '#4b5161' }}>
                  {content.subtitle}
                </Typography>
              </Card>
            ))}
          </div>
        ) : (
          <Typography
            component='p'
            sx={{ color: '#4b5161', marginTop: '10px' }}
          >
            {data.content && data.content}
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
      {data.images && data.images.length > 0 && (
        <Grid
          item={'true'}
          xs={12}
          md={data.imagePosition === 'column' ? 12 : 6}
          order={data.imagePosition === 'column' ? 0 : imageOrder}
          container
          spacing={2}
        >
          {data.images.map((image, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '320px' }}>
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                  <Typography
                    level='h3'
                    component='h3'
                    sx={{ color: '#4b5161' }}
                  >
                    {image.title}
                  </Typography>
                  <Typography sx={{ color: '#4b5161' }}>
                    {image.subtitle}
                  </Typography>
                </CardContent>
                <img
                  src={image.url}
                  alt={image.description}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginBottom: '10px',
                    borderRadius: '15px',
                  }}
                />
                <Typography level='body-sm'>{image.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  )
}

export default Section
