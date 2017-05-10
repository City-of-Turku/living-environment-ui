import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { Element as ScrollElement } from 'react-scroll';

import styles from './ContentWrapper.less';

const wrappersList = [];
let currentSection = Number.MAX_SAFE_INTEGER;
// wrappersList is an ordered list of the sections shown on the page. It's used as an lookup table
// (the section indices are calculated based on this table). During the page initialization
// handleEnterHelper method is called for each section in the viewport. The "visible" section with
// the lowest index will be the shown in the menu as the active (selected) item - currentSelection
// (currentSelection is only important during the page initialization)
// please note that wrappersList and currentSection are shared by all ContentWrapper instances
// on the page.

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
        handleWaypoint(wrappersList[currentSection]);
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
      <ScrollElement name={id}>
        <Waypoint
          onEnter={({ previousPosition }) => this.handleEnterHelper(previousPosition)}
          onLeave={({ currentPosition }) => this.handleLeaveHelper(currentPosition)}
          topOffset={30}
          bottomOffset={30}
        >
          <div className={styles.root}>
            {children}
          </div>
        </Waypoint>
      </ScrollElement>);
  }
}


ContentWrapper.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleWaypoint: PropTypes.func.isRequired,
  children: PropTypes.node,
};

ContentWrapper.defaultProps = {
  children: null,
};

export default ContentWrapper;
