import React from 'react';
import classNames from 'classnames';

import styles from './SideBar.less';

const menuItems = [
  {
    label: 'My Assignment Name',
    url: '#',
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

const SideBar = () => (
  <div className={styles.root}>
    <div className={styles.logoWrapper}>
      <i className={classNames('glyphfont', 'turku-logo', styles.logo)} />
    </div>
    <ul role="menu" className={styles.menu}>
      {
        menuItems.map(item => (
          <li role="none" className={styles.selectedItem}>
            <div className={styles.menuItem}>
              <a href="#" role="menuitem">
                <span className={styles.iconWrapper}>
                  <i className={classNames('glyphfont', 'icon-triangle', styles.menuIcon)}/>
                </span>
                {item.label}</a>
            </div>
            {
              item.subitems && (
                <ul className={styles.submenu}>
                  {
                    item.subitems.map(subitem => (
                      <li role="none" className={classNames(styles.menuSubitem, styles.menuSubitemSelected)}>
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
  </div>
);

export default SideBar;
