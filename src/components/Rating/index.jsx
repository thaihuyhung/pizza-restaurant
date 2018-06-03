import React from 'react';
import PropTypes from 'prop-types';
import './style';

const numberFormatter = new Intl.NumberFormat('de-DE');
const Rating = ({ data }) => {
  const stars = [1, 2, 3, 4, 5];
  const total = stars.reduce((pre, cur) => pre + data.get(`star${cur}`), 0);
  return (
    <div className="rating">
      <div className="rating__stars">
        <div className="rating__stars--active" style={{ width: `${Math.min(data.get('average') / 5 * 100, 100)}%` }}>
          {
            stars.map(star => <i key={star} className="material-icons">star</i>)
          }
        </div>
        <div className="rating__stars--default">
          {
            stars.map(star => <i key={star} className="material-icons">star</i>)
          }
        </div>
      </div>
      <div className="rating__total">
        ({numberFormatter.format(total)})
      </div>
      <div className="rating__total-detail">
        {
          stars.reverse().map((value) => (
            <div key={value} className="rating__progress">
              <div className="rating__progress-label">{value === 1 ? '1 star' : `${value} stars`}</div>
              <div className="rating__progress--active" style={{ width: `${Math.min(data.get(`star${value}`) / total * 100, 100)}px` }} />
              <div className="rating__progress--default" />
              <div className="rating__progress-count">{numberFormatter.format(data.get(`star${value}`))}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

Rating.propTypes = {
  data: PropTypes.object
}

export default Rating;