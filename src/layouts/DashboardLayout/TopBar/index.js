import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Tabs,
  Tab,
  SvgIcon,
  useTheme
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import Logo from '../../../components/Logo';
import { THEMES } from '../../../constants';
import Account from './Account';
import Settings from './Settings';
import useTabs from '../../../hooks/useTabs';
import SchoolIcon from '@material-ui/icons/School';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === THEMES.LIGHT || theme.name === THEMES.CARBON
      ? {
          boxShadow: 'none',
          //TODO-ADD WHITE TO PALETTE?
          backgroundColor: 'white'
        }
      : {}),
    ...(theme.name === THEMES.ONE_DARK ||
    theme.name === THEMES.RUBY ||
    theme.name === THEMES.SAPPHIRE ||
    theme.name === THEMES.EMERALD ||
    theme.name === THEMES.HALLOWEEN ||
    theme.name === THEMES.JUST_PINK
      ? {
          backgroundColor: theme.palette.background.default
        }
      : {})
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    justifyContent: 'space-between'
  },
  tabIcon: {
    width: 32
  },
  icon: {
    fill: `url(#icon=gradients) ${theme.palette.primary.main};`,
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '32px'
    }
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  useEffect(() => {
    if (window.location.pathname.includes('/app/games')) {
      setTab(1);
    }
    if (window.location.pathname === '/app/exams/browse') {
      setTab(2);
    }
    if (window.location.pathname === '/app/profile') {
      setTab(3);
    }
  }, []);
  const theme = useTheme();
  const { currTab, setTab } = useTabs();
  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar} disableGutters>
        <Hidden lgUp>
          <IconButton color="primary" onClick={onMobileNavOpen}>
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <Box
            width={1}
            maxWidth="320px"
            height="56px"
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo />
            </RouterLink>
            <Box ml={1}>
              <SearchBar />
            </Box>
          </Box>
        </Hidden>
        <Tabs
          value={currTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="exampalace-nav-tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<SchoolIcon className={classes.icon} />} />
          <Tab
            component={RouterLink}
            to="/app/games"
            icon={<SportsEsportsIcon className={classes.icon} />}
          />
          <Tab
            component={RouterLink}
            to="/app/exams/browse"
            icon={<MenuBookIcon className={classes.icon} />}
          />
          <Tab
            component={RouterLink}
            to="/app/profile"
            icon={<EmojiPeopleIcon className={classes.icon} />}
          />
        </Tabs>
        <Box mr={2} display="flex" alignItems="center">
          <Account />
          <Hidden xsDown>
            <Settings />
          </Hidden>
        </Box>
      </Toolbar>

      <svg
        style={{ width: '0', height: '0', position: 'absolute' }}
        aria-hidden="true"
        focusable="false"
      >
        <linearGradient id="icon=gradients" x2="1" y2="1">
          <stop offset="0%" stop-color={theme.palette.primary.accent1} />
          <stop offset="100%" stop-color={theme.palette.primary.main} />
        </linearGradient>
      </svg>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;
