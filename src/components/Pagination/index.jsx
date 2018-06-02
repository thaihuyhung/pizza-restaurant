import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import { fromJS } from 'immutable';
import classNames from 'classnames';
import './style';

const pageSizeOptions = fromJS([{
  key: 5,
  value: 5
}, {
  key: 10,
  value: 10
}, {
  key: 20,
  value: 20
}, {
  key: 50,
  value: 50
}]);

const Pagination = ({ pageSize, page, total, alignment, className, onChangePageSize, onNavigate }) => {
  const totalPage = Math.ceil(total / pageSize);
  const disablePrevious = page === 1;
  const disableNext = page === totalPage;

  const handleChangePageSize = (selectedItem) => {
    if (onChangePageSize) {
      onChangePageSize(selectedItem.get('key'))
    }
  }
  
  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page)
    }
  }

  return (
    <div className={classNames('pagination', `pagination--align-${alignment}`, className)}>
      <div className="pagination__info">
        <div className="pagination__page-size">
          <span>Items per page</span>
          <Select 
            className="pagination__page-size-select" 
            options={pageSizeOptions} 
            label={pageSize.toString()} 
            onChange={handleChangePageSize} 
          />
        </div>
        <div className="pagination__page-info">
          {(page - 1) * pageSize + 1}-{Math.min(total, page * pageSize)} of {total}
        </div>
      </div>
      <div className="pagination__action">
        <button className="pagination__button" disabled={disablePrevious} onClick={() => handleNavigate(1)}>
          <i className="material-icons">first_page</i>
        </button>
        <button className="pagination__button" disabled={disablePrevious} onClick={() => handleNavigate(Math.max(1, page - 1))}>
          <i className="material-icons">navigate_before</i>
        </button>
        <button className="pagination__button" disabled={disableNext} onClick={() => handleNavigate(Math.min(totalPage, page + 1))}>
          <i className="material-icons">navigate_next</i>
        </button>
        <button className="pagination__button" disabled={disableNext} onClick={() => handleNavigate(totalPage)}>
          <i className="material-icons">last_page</i>
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number,
  page: PropTypes.number,
  total: PropTypes.number,
  alignment: PropTypes.oneOf(['left', 'right', 'center']),
  className: PropTypes.string,
  onChangePageSize: PropTypes.func,
  onNavigate: PropTypes.func
};

Pagination.defaultProps = {
  pageSize: 1,
  page: 1,
  total: 1,
  alignment: 'right'
}

export default Pagination;