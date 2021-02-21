/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import Logo from '../../../components/Logo';
import useAuth from '../../../hooks/useAuth';
import NavItem from './NavItem';
import useTabs from '../../../hooks/useTabs';

function renderNavItems({ items, pathname, depth = 0 }, setTab) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) =>
          reduceChildRoutes({ acc, item, pathname, depth }, setTab),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }, setTab) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
        onClick={item.tab && (() => setTab(item.tab))}
      >
        {renderNavItems(
          {
            depth: depth + 1,
            pathname,
            items: item.items
          },
          setTab
        )}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
        onClick={item.tab && (() => setTab(item.tab))}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 56,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, sections }) => {
  const classes = useStyles();
  const location = useLocation();
  const { setTab } = useTabs();
  const {
    user: { tier }
  } = useAuth();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center" alignItems="center">
            <RouterLink to="/">
              <Avatar style={{ backgroundColor: 'transparent' }}>
                <Logo />
              </Avatar>
            </RouterLink>
            <Box ml={1}>
              <Typography variant="overline">Exam Palace</Typography>
            </Box>
          </Box>
        </Hidden>
        <Divider />
        <Box pl={1} pr={1} pb={1}>
          {sections.map(section => {
            if (section.admin) {
              if (tier === 'Premium') {
                return (
                  <List
                    key={section.subheader}
                    subheader={
                      <ListSubheader disableGutters disableSticky>
                        {section.subheader}
                      </ListSubheader>
                    }
                  >
                    {renderNavItems(
                      {
                        items: section.items,
                        pathname: location.pathname
                      },
                      setTab
                    )}
                  </List>
                );
              } else {
                return null;
              }
            } else {
              return (
                <List
                  key={section.subheader}
                  subheader={
                    <ListSubheader disableGutters disableSticky>
                      {section.subheader}
                    </ListSubheader>
                  }
                >
                  {renderNavItems(
                    {
                      items: section.items,
                      pathname: location.pathname
                    },
                    setTab
                  )}
                </List>
              );
            }
          })}
        </Box>
        <Divider />
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
