import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../../assets/default-image.png';
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
    return data.get('loaded') !== nextData.get('loaded') ||
      data.get('backgroundImage') !== nextData.get('backgroundImage') ||
      this.props.src !== nextProps.src;
  }

  componentDidMount() {
    /**
     * Improving UX by display skeleton loading when image is loading.
     * In case the image url is broken, we show a default image
     */
    const { src } = this.props;
    let image = new Image();
    image.onload = () => {
      this.setState(({ data }) => ({
        data: data
          .update('loaded', () => true)
          .update('backgroundImage', () => encodeURI(src))
      }));
    }
    image.onerror = () => {
      this.setState(({ data }) => ({
        data: data
          .update('loaded', () => true)
          .update('backgroundImage', () => defaultImage)
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
      <div className={classNames('image', className, { 'skeleton': !loaded })}>
        {
          backgroundImage && <img src={backgroundImage} />
        }
      </div>
    );
  }
}

CustomImage.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};

export default CustomImage;