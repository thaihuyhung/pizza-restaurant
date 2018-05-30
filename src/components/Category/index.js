import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style';

const Category = ({data, className: classname = ''}) => {
  return (
    <div className={classNames('category', classname)}>
      {data}
    </div>
  );
}

Category.propTypes = {
  data: PropTypes.string,
  className: PropTypes.string
}

export default Category;

