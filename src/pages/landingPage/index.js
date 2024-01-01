import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Sheet, Stack, Box, Typography, Container, Grid } from '@mui/joy'
import { styled } from '@mui/joy/styles'
import sectionData from './sectionData'

const Section = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.colors.text,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(1),
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  borderRadius: theme.radius.md,
}))

const LandingPage = () => {
  const { isAuthenticated } = useAuth0()

  const renderContent = (item) => {
    const textOrder = item.imagePosition === 'right' ? 1 : 2
    const imageOrder = item.imagePosition === 'right' ? 2 : 1

    return (
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid
          item
          xs={12}
          md={item.imagePosition === 'column' ? 12 : 6}
          order={item.imagePosition === 'column' ? 0 : textOrder}
        >
          <Typography level='h1' component='h1' sx={{ color: '#fdf5eb' }}>
            {item.heading}
          </Typography>
          {item.isNumberedList ? (
            <ol>
              {item.content.map((listItem, index) => (
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
              {item.content}
            </Typography>
          )}
        </Grid>
        {item.imageUrl && (
          <Grid
            item
            xs={12}
            md={item.imagePosition === 'column' ? 12 : 6}
            order={item.imagePosition === 'column' ? 0 : imageOrder}
          >
            <img
              src={process.env.PUBLIC_URL + item.imageUrl}
              alt={item.heading}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Grid>
        )}
      </Grid>
    )
  }

  return (
    !isAuthenticated && (
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2} sx={{ marginTop: '20px' }}>
          {sectionData.map((item, index) => (
            <Section key={index} sx={{ backgroundColor: item.backgroundColor }}>
              <Container maxWidth='md'>{renderContent(item)}</Container>
            </Section>
          ))}
        </Stack>
      </Box>
    )
  )
}

export default LandingPage
