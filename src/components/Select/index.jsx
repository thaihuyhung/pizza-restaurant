import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fromJS } from 'immutable';
import Checkbox from '../Checkbox';
import './style';

class Select extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      data: fromJS({
        opened: false,
        dropdownWidth: 120
      })
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    const { data } = this.state;
    if (data.get('opened') && this.ref.current && !this.ref.current.contains(event.target)) {
      this.handleToggleSelect();
    }
  }

  handleToggleSelect = () => {
    this.setState(({ data }) => ({
      data: data
        .update('opened', opened => !opened)
        .update('dropdownWidth', () => this.ref.current.offsetWidth)
    }));
  }

  onSelectItem = (option) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(option);
    }
    this.handleToggleSelect();
  }

  renderCheckboxItems = (options) => {
    const { selectedItems } = this.props;
    return options.map((option) => (
      <li key={option.get('key')} onClick={() => this.onSelectItem(option)}>
        <Checkbox checked={selectedItems.includes(option.get('key'))}>{option.get('value')}</Checkbox>
      </li>
    )
    );
  }

  renderItems = (options = []) => {
    return options.map((option) => 
      <li key={option.get('key')} onClick={() => this.onSelectItem(option)}>{option.get('value')}</li>
    );
  }

  render() {
    const { options, multiple, label, className: classname = '', selectedItems, selectedItem } = this.props;
    const { data } = this.state;
    return (
      <div ref={this.ref} className={classNames('select', classname, { 'select--selected' : multiple ? selectedItems.size > 0 : selectedItem })}>
        <div className="select__header" onClick={this.handleToggleSelect}>
          <div className="select__label">{label}</div>
          <i className="material-icons select__arrow-icon">arrow_drop_down</i>
        </div>
        <ul 
          className={classNames('select__dropdown', { 'select__dropdown--open': data.get('opened')})}
          style={{ width: `${data.get('dropdownWidth')}px`}}>
          {
            multiple ? this.renderCheckboxItems(options) : this.renderItems(options)
          }
        </ul>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.object,
  label: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  selectedItems: PropTypes.object,
  selectedItem: PropTypes.string,
};

export default Select;