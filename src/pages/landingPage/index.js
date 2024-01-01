import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Stack, Box, Container } from '@mui/joy'
import sectionData from './sectionData'
import Section from './section'
import StyledSection from './styledSection'

const LandingPage = () => {
  const { isAuthenticated } = useAuth0()

  return (
    !isAuthenticated && (
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2} sx={{ marginTop: '20px' }}>
          {sectionData.map((item, index) => (
            <StyledSection
              key={index}
              sx={{ backgroundColor: item.backgroundColor }}
            >
              <Container maxWidth='md'>
                <Section data={item} />
              </Container>
            </StyledSection>
          ))}
        </Stack>
      </Box>
    )
  )
}

export default LandingPage
