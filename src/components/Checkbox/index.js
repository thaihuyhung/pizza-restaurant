import React from 'react';
import PropTypes from 'prop-types';
import './style';

const Checkbox = ({ children, checked, onChange }) => {
  const handleUpdate = () => {
      if (onChange) {
        onChange(!checked);
      }
  }
  return (
    <div className="checkbox" onClick={handleUpdate}>
      <input type="checkbox" checked={checked} />
      <label>
        <i className="material-icons">{checked ? 'check_box' : 'check_box_outline_blank'}</i>
        <span>{children}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  children: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;