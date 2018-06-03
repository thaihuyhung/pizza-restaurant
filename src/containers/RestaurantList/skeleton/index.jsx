import React from 'react';
import './style';

const RestaurantListSkeleton = () => {
  const items = new Array(5).fill(1);
  const infoLines = new Array(4).fill(1);
  return (
    <div className="restaurants-skeleton">
      <div className="restaurants-skeleton__page-logo skeleton"></div>
      <div className="restaurants-skeleton__header">
        <div className="restaurants-skeleton__search-result skeleton"></div>
        <div className="restaurants-skeleton__actions">
          <div className="restaurants-skeleton__action skeleton"></div>
          <div className="restaurants-skeleton__action skeleton"></div>
        </div>
      </div>
      {
        items.map((item, index) => (
          <div key={index} className="restaurants-skeleton__item">
            <div className="restaurants-skeleton__item-logo skeleton"></div>
            <div className="restaurants-skeleton__item-header--xs">
                <div className="restaurants-skeleton__item-name skeleton"></div>
                <div className="restaurants-skeleton__item-rating skeleton"></div>
              </div>
            <div className="restaurants-skeleton__item-info">
              <div className="restaurants-skeleton__item-header">
                <div className="restaurants-skeleton__item-name skeleton"></div>
                <div className="restaurants-skeleton__item-rating skeleton"></div>
              </div>
              {
                infoLines.map((item, index) => (
                  <div key={index} className="restaurants-skeleton__item-info-line">
                    <div className="restaurants-skeleton__item-info-icon skeleton"></div>
                    <div className="restaurants-skeleton__item-info-content skeleton"></div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default RestaurantListSkeleton;