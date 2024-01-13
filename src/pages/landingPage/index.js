import React, { useEffect } from 'react'
import { Stack, Box, Container } from '@mui/joy'
import sectionData from './sectionData'
import Section from './section'
import StyledSection from './styledSection'
import { useUser } from '../../context/userProvider'

const LandingPage = () => {
  const { resetUserState, isUserVerified } = useUser() // Get setLoading function from context

  useEffect(() => {
    resetUserState()
  }, [resetUserState])

  return (
    !isUserVerified && (
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
