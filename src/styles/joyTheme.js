import { extendTheme } from '@mui/joy'
import { alpha } from '@mui/material/styles'

export const lighten = (color, amount) => alpha(color, amount)

export const joyTheme = extendTheme({
  palette: {
    colors: {
      primary: {
        main: '#f58b44',
        light: lighten('#f58b44', 0.5),
      },
      secondary: {
        main: '#F9B917', // yellow
        light: lighten('#F9B917', 0.2),
      },
      tertiary: {
        main: '#52b6de', // blue  #86D1AC // green
        light: lighten('#52b6de', 0.2),
      },
      fourth: {
        main: '#86D1AC',
        light: lighten('#f06e1d', 0.5),
      },
      error: '#f06e1d',
      background: {
        main: '#fdf5eb',
        dark: '#f4e6d4',
      },
      text: '#4b5161',
    },
  },
  components: {
    JoyTable: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.vars.palette.colors.background.main,
            color: theme.vars.palette.colors.text,
          }),
        }),
      },
    },
    JoyChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          '&.custom-chip': {
            color: ownerState.selected
              ? theme.vars.palette.colors.background.main
              : theme.vars.palette.colors.text,
            // other styles
          },
          ...(ownerState.color === 'secondary' && {
            backgroundColor: theme.vars.palette.colors.secondary.light,
            color: theme.vars.palette.colors.text,
          }),
          ...(ownerState.color === 'tertiary' && {
            backgroundColor: theme.vars.palette.colors.tertiary.light,
            color: theme.vars.palette.colors.text,
          }),
        }),
        action: ({ ownerState, theme }) => ({
          backgroundColor:
            ownerState.color === 'secondary'
              ? theme.vars.palette.colors.secondary.light
              : theme.vars.palette.colors.tertiary.light,
          '&:hover': {
            backgroundColor:
              ownerState.color === 'secondary'
                ? theme.vars.palette.colors.secondary.main
                : theme.vars.palette.colors.tertiary.main,
          },
          ...(ownerState.selected === true && {
            color: theme.vars.palette.colors.background.main,
            backgroundColor:
              ownerState.color === 'secondary'
                ? theme.vars.palette.colors.secondary.main
                : theme.vars.palette.colors.tertiary.main,
          }),
        }),
      },
    },
    JoySheet: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.vars.palette.colors.background.main,
            color: theme.vars.palette.colors.text,
          }),
        }),
      },
    },
    JoySelect: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.vars.palette.colors.background.main,
            color: theme.vars.palette.colors.text,
          }),
        }),
      },
    },
    JoyTabs: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.vars.palette.colors.background.main,
            color: theme.vars.palette.colors.text,
          }),
        }),
      },
    },
    JoyCard: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'background' && {
            backgroundColor: theme.vars.palette.colors.background.main,
            color: theme.vars.palette.colors.background.main,
          }),
        }),
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.vars.palette.colors.primary.main,
            color: theme.vars.palette.colors.background.main,
          }),
        }),
      },
    },
  },
})
