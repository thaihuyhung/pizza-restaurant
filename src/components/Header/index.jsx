import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
import './style';

const Header = ({ fixed }) => {
  return (
    <header className={classNames('header', {'header--fixed': fixed})}>
      <LoadingBar className="header__loading-bar" />
      <div className="header__content">
        PIZZA.DE
      </div>
    </header>
  );
};

Header.propTypes = {
  fixed: PropTypes.bool
};

export default Header;