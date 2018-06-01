import React from 'react';
import PropTypes from 'prop-types';
import './style';

const NotFoundMessage = props => {
  const title = props.title || "We're sorry!";
  const subtitle = props.subtitle || "The page you have requested cannot be found";
  const information = props.information || [
    "Maybe the page was moved or deleted, or perhaps you just mistyped the address",
    "Why not try and find your way using the navigation bar above or click the logo to return to our homepage"
  ];
  return (
    <div className="not-found-msg">
      <div className="not-found-msg__title">{title}</div>
      <div className="not-found-msg__subtitle">{subtitle}</div>
      {
        information && (
          <section className="not-found-msg__information">
          {
            information.map((item, index) => <p key={index}>{item}</p>)
          }
          </section>
        )
      }
    </div>
  );
};

NotFoundMessage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  information: PropTypes.string,
};

export default NotFoundMessage;