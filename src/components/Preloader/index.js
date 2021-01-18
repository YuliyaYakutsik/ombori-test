import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './index.css';

const Preloader = ({
  isSmall,
}) => {
  const componentClass = cn('Preloader', {
    Preloader_size_small: isSmall,
  });

  return (
    <div className={componentClass} />
  );
};

Preloader.propTypes = {
  isSmall: PropTypes.bool,
};

Preloader.defaultProps = {
  isSmall: false,
};

export default Preloader;
