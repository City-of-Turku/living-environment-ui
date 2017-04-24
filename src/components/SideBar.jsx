import React, { Component } from 'react';
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
        url: '#',
      },
      {
        label: 'Player Information',
        url: '#',
      },
      {
        label: 'Basic Question Task Name',
        url: '#',
      },
      {
        label: 'Budgeting Task',
        url: '#',
      },
      {
        label: 'Budgeting Map Task',
        url: '#',
      },
      {
        label: 'Friend of the Park',
        url: '#',
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

  resolveToLocation(to, router) {
    return typeof to === 'function' ?
      to(router.location) : to;
  }

  calcMenuWrapperStyle(to) {
    const { router } = this.context;
    const toLocation = this.resolveToLocation(to, router);
    return router.isActive(toLocation) ? styles.selectedItem : '';
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.logoWrapper}>
          <i className={classNames('glyphfont', 'turku-logo', styles.logo)}/>
        </div>
        <ul role="menu" className={styles.menu}>
          {
            menuItems.map(item => (
              <li role="none" className={this.calcMenuWrapperStyle(item.url)}>
                <div className={styles.menuItem}>
                  <Link to={item.url} role="menuitem">
                <span className={styles.iconWrapper}>
                  <i className={classNames('glyphfont', 'icon-triangle', styles.menuIcon)}/>
                </span>
                    {item.label}</Link>
                </div>
                {
                  item.subitems && (
                    <ul className={styles.submenu}>
                      {
                        item.subitems.map(subitem => (
                          <li role="none"
                              className={classNames(styles.menuSubitem, styles.menuSubitemSelected)}>
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


export default SideBar;
