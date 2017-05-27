import React from 'react';
import PropTypes from 'prop-types';

const TopImage = ({ url, altText }) => (<div>
  <img
    className="img-responsive img-rounded"
    src={url}
    alt={altText}
  />
</div>);

TopImage.propTypes = {
  url: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default TopImage;
