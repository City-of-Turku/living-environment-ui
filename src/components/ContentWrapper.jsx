import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

import styles from './ContentWrapper.less';

const wrappersList = [];
let currentSection = Number.MAX_SAFE_INTEGER;

class ContentWrapper extends Component {

  setInitialSection() {
    if (currentSection !== -1 && currentSection !== wrappersList.length) {
      const { handleWaypoint } = this.props;
      handleWaypoint(wrappersList[currentSection]);
    }
  }

  handleEnterHelper(previousPosition) {
    const { id, handleWaypoint } = this.props;
    if (previousPosition === Waypoint.above) {
      handleWaypoint(id);
    } else if (!previousPosition) {
      const index = wrappersList.indexOf(id);
      if (index !== -1 && index < currentSection) {
        currentSection = index;
        this.setInitialSection();
      }
    }
  }

  handleLeaveHelper(currentPosition) {
    const { id, handleWaypoint } = this.props;
    const index = wrappersList.indexOf(id);
    if (currentPosition === Waypoint.above) {
      if (index < wrappersList.length - 1) {
        handleWaypoint(wrappersList[index + 1]);
      }
    }
  }

  render() {
    const { id, children } = this.props;
    if (id === '_') {
      currentSection = Number.MAX_SAFE_INTEGER;
      return null;
    }
    wrappersList.push(id);
    return (
      <Waypoint
        onEnter={({ previousPosition }) => this.handleEnterHelper(previousPosition)}
        onLeave={({ currentPosition }) => this.handleLeaveHelper(currentPosition)}
        topOffset={30}
        bottomOffset={30}
      >
        <div className={styles.root}>
          {children}
        </div>
      </Waypoint>);
  }
}


ContentWrapper.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleWaypoint: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ContentWrapper;
