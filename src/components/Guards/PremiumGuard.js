import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

const PremiumUserGuard = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated && user.tier === 'Premium') {
    return <Redirect to="/app/account" />;
  }

  return <>{children}</>;
};

PremiumUserGuard.propTypes = {
  children: PropTypes.node
};

export default PremiumUserGuard;
