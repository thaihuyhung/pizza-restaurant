import React from 'react';
import './style';

const RestaurantDetailSkeleton = () => {
  const infoLines = new Array(4).fill(1);
  const sections = new Array(4).fill(1);
  const sectionItems = new Array(3).fill(1);
  return (
    <div className="res-detail-skeleton">
      <div className="res-detail-skeleton__header">
        <div className="res-detail-skeleton__navigation skeleton"></div>
        <div className="res-detail-skeleton__info">
          <div className="res-detail-skeleton__image skeleton"></div>
          <div className="res-detail-skeleton__main-info">
            <div className="res-detail-skeleton__tile-rating">
              <div className="res-detail-skeleton__title skeleton"></div>
              <div className="res-detail-skeleton__rating skeleton"></div>
            </div>
            {
              infoLines.map((item, index) => (
                <div key={index} className="res-detail-skeleton__item-info-line">
                  <div className="res-detail-skeleton__item-info-icon skeleton"></div>
                  <div className="res-detail-skeleton__item-info-content skeleton"></div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {
        sections.map((item, index) => (
          <div key={index} className="res-detail-skeleton__section">
            <div className="res-detail-skeleton__section-header">
              <div className="res-detail-skeleton__section-name skeleton"></div>
            </div>
            {
              sectionItems.map((item, index) => (
                <div key={index} className="res-detail-skeleton__section-item">
                  <div className="res-detail-skeleton__item-info">
                    <div className="res-detail-skeleton__item-title skeleton"></div>
                    <div className="res-detail-skeleton__item-desc skeleton"></div>
                  </div>
                  <div className="res-detail-skeleton__item-pricing">
                    <div className="res-detail-skeleton__item-price skeleton"></div>
                    <div className="res-detail-skeleton__item-add skeleton"></div>
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

export default RestaurantDetailSkeleton;