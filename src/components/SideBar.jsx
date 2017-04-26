/* eslint-disable jsx-a11y/aria-role */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, routerShape } from 'react-router';

import styles from './SideBar.less';

const menuItems = [
  {
    label: 'My Assignment Name',
    url: '/assignment/assignment-1',
    icon: 'fa-home',
    chevron: 'fa-chevron-up',
    subitems: [
      {
        label: 'Landing Page',
        id: '2-section',
      },
      {
        label: 'Player Information',
        id: '2-3-open-text-map',
      },
      {
        label: 'Basic Question Task Name',
        id: '2-4-open-text-map',
      },
      {
        label: 'Budgeting Task',
        id: '2-3-budgeting_task',
      },
      {
        label: 'Budgeting Map Task',
        id: '1-section',
      },
      {
        label: 'Friend of the Park',
        id: '1-1-open-text-map',
      },
    ]
  },
  {
    label: 'Another Link',
    chevron: 'fa-chevron-down',
    url: '#',
  },
];

class SideBar extends Component {

  resolveToLocation(to, router) { // eslint-disable-line class-methods-use-this
    return typeof to === 'function' ?
      to(router.location) : to;
  }

  calcMenuWrapperStyle(to) {
    const { router } = this.context;
    const toLocation = this.resolveToLocation(to, router);
    return router.isActive(toLocation) ? styles.selectedItem : '';
  }

  render() {
    const { currentSection } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.logoWrapper}>
          <i className={classNames('glyphfont', 'turku-logo', styles.logo)} />
        </div>
        <ul role="menu" className={styles.menu}>
          {
            menuItems.map(item => (
              <li role="none" className={this.calcMenuWrapperStyle(item.url)}>
                <div className={styles.menuItem}>
                  <Link to={item.url} role="menuitem">
                    <span className={styles.iconWrapper}>
                      <i className={classNames('glyphfont', 'icon-triangle', styles.menuIcon)} />
                    </span>
                    {item.label}</Link>
                </div>
                {
                  item.subitems && (
                    <ul className={styles.submenu}>
                      {
                        item.subitems.map(subitem => (
                          <li
                            role="none"
                            className={classNames(
                                styles.menuSubitem,
                                currentSection === subitem.id
                                  ? styles.menuSubitemSelected
                                  : ''
                              )}
                          >
                            <a href={subitem.url} role="menuitem">{subitem.label}</a>
                          </li>
                        ))
                      }
                    </ul>
                  )
                }
              </li>
            ))
          }
        </ul>
      </div>);
  }
}

SideBar.contextTypes = {
  router: routerShape
};

SideBar.propTypes = {
  currentSection: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]).isRequired,
};


export default SideBar;
/* eslint-enable jsx-a11y/aria-role */
