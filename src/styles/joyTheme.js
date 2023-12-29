import { extendTheme } from "@mui/joy";
import {alpha } from '@mui/material/styles';

export const lighten = (color, amount) => alpha(color, amount);

export const joyTheme = extendTheme({
  palette: {
    colors: {
      primary: {
        main: "#f58b44",
        light: lighten("#f58b44", 0.5),
      },
      secondary: {
        main: "#F9B917",
        light: lighten("#F9B917", 0.5),
      },
      tertiary: {
        main: "#52b6de",
        light: lighten("#52b6de", 0.5),
      },
      error: "#f06e1d",
      background: {
        main: "#fdf5eb",
        dark: "#F4E6D4",
      },
      text: "#4b5161",
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
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.vars.palette.colors.secondary.light,
            color: theme.vars.palette.colors.text,
          }),
          ...(ownerState.color === 'neutral' && {
            backgroundColor: theme.vars.palette.colors.tertiary.light,
            color: theme.vars.palette.colors.text,
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
});