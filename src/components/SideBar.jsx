import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, routerShape } from 'react-router';

import styles from './SideBar.less';
import resolveToLocation from './helpers/routerHelper';

const menuItems = [
  {
    id: 1,
    label: 'My Assignment Name',
    url: '/assignment/new-assignment-1',
    icon: 'fa-home',
    chevron: 'fa-chevron-up',
    subitems: [
      {
        label: 'Landing Page',
        id: '1-assignment',
      },
      {
        label: 'Player Information',
        id: '1-open-text-map',
      },
      {
        label: 'Basic Question Task Name',
        id: '2-open-text-map',
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
    id: 2,
    label: 'Another Link',
    chevron: 'fa-chevron-down',
    url: '#',
  },
];

class SideBar extends Component {

  calcMenuWrapperStyle(to) {
    const { router } = this.context;
    const toLocation = resolveToLocation(to, router);
    return router.isActive(toLocation) ? styles.selectedItem : '';
  }

  calcSubmenuStyle(id) {
    const { currentSection } = this.props;
    return currentSection === id ? styles.menuSubitemSelected : '';
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.logoWrapper}>
          <i className={classNames('glyphfont', 'turku-logo', styles.logo)} />
        </div>
        <ul role="menu" className={styles.menu} aria-label="Side bar">
          {
            menuItems.map(item => (
              <li role="presentation" className={this.calcMenuWrapperStyle(item.url)} key={item.id}>
                <div className={styles.menuItem}>
                  <Link to={item.url} role="menuitem">
                    <span className={styles.iconWrapper}>
                      <i className={classNames('glyphfont', 'icon-triangle', styles.menuIcon)} />
                    </span>
                    {item.label}</Link>
                </div>
                { item.subitems && (
                  <ul className={styles.submenu}>
                    {
                      item.subitems.map(subitem => (
                        <li
                          key={subitem.id}
                          role="presentation"
                          className={classNames(
                            styles.menuSubitem,
                            this.calcSubmenuStyle(subitem.id))}
                        >
                          <a href={subitem.url} role="menuitem">{subitem.label}</a>
                        </li>))
                    }
                  </ul>)}
              </li>))}
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
