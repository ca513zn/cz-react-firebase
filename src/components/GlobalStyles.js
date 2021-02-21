import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%'
      },
      body: {
        height: '100%',
        width: '100%'
      },
      '#root': {
        height: '100%',
        width: '100%'
      },
      '::-webkit-scrollbar': {
        width: '6px',
        opacity: '0.5',
      },
      '::-webkit-scrollbar-track': {
        boxShadow: `inset 0 0 5px ${theme.palette.background.paper}`,
        opacity: '0.5',
        borderRadius: '10px'
      },
      '::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main,
        opacity: '0.5',
        borderRadius: '10px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.primary.dark,
        opacity: '0.5'
      }
    }
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
