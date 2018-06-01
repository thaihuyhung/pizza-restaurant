import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultImage from 'assets/default-image.png';
import { fromJS } from 'immutable';
import classNames from 'classnames';
import './style';

class CustomImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fromJS({
        loaded: false,
        backgroundImage: ''
      })
    }
  }

  shouldComponentUpdate(nextProps, { data: nextData }) {
    const { data } = this.state;
    return data.get('loaded') !== nextData.get('loaded') || data.get('backgroundImage') !== nextData.get('backgroundImage');
  }

  componentDidMount() {
    const { src } = this.props;
    let image = new Image();
    image.onload = () => {
      this.setState(({ data }) => ({
        data: data
        .update('loaded', () => true)
        .update('backgroundImage', () => `url(${encodeURI(src)})`)
      }));
    }
    image.onerror = () => {
      this.setState(({ data }) => ({
        data: data
        .update('loaded', () => true)
        .update('backgroundImage', () => `url(${defaultImage})`)
      }));
    }
    image.src = src;
  }


  render() {
    const { data } = this.state;
    const loaded = data.get('loaded');
    const backgroundImage = data.get('backgroundImage');
    const { className } = this.props;
    return (
      <div className={classNames('image', className, { 'skeleton': !loaded })} style={{ backgroundImage }}></div>
    );
  }
}

CustomImage.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};

export default CustomImage;