import { Sheet } from '@mui/joy'
import { styled } from '@mui/joy/styles'

const StyledSection = styled(Sheet)(({ theme }) => ({
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

export default StyledSection
