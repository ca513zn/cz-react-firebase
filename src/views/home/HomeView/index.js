import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import CTA from './CTA';

const useStyles = makeStyles(() => ({
  root: {}
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <CTA />
    </Page>
  );
};

export default HomeView;
