import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fromJS } from 'immutable';
import './style';

class SkeletonLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fromJS({
        removed: false
      })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  

  render() {
    const { children, skeletonTemplate, loading, hasError, errorTemplate } = this.props;
    const { data } = this.state;
    const removed = data.get('removed');
    if (!loading && !removed) {
      setTimeout(() => {
        this.setState(({ data }) => ({
          data: data.update('removed', () => true)
        }))
      }, 1500);
    }
    return (
      [
        !removed && 
          <div key="skeleton" className={classNames('skeleton-loading', { 'skeleton-loading--loaded' : !loading})}>
            <div className="skeleton-loading__body">
              {skeletonTemplate}
            </div>
          </div>,
        !loading && !hasError && children,
        hasError && errorTemplate
      ]
    );
  }
}

SkeletonLoading.propTypes = {
  children: PropTypes.object,
  skeletonTemplate: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool,
  errorTemplate: PropTypes.object
};

export default SkeletonLoading;