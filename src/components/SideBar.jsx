import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, routerShape } from 'react-router';
import { Link as ScrollLink } from 'react-scroll';
import { Badge } from 'react-bootstrap';
import currencyFormatter from 'currency-formatter';

import styles from './SideBar.less';
import resolveToLocation from './helpers/routerHelper';
import createMenuItems from './helpers/sideBarMenu';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  calcMenuWrapperStyle(to) {
    const { router } = this.context;
    const toLocation = resolveToLocation(to, router);
    return router.isActive(toLocation) ? styles.selectedItem : '';
  }

  calcSubmenuStyle(id) {
    const { currentSection } = this.props;
    return currentSection === id ? styles.menuSubitemSelected : '';
  }

  handleItemClick() {
    const { hideMenu, scrollPageToTop } = this.props;
    hideMenu();
    scrollPageToTop();
  }

  render() {
    const { assignment, budget, reportName } = this.props;
    if (!assignment) {
      return null;
    }
    const menuItems = createMenuItems(assignment, budget, reportName);
    return (
      <div className={styles.root}>
        <div className={styles.logoWrapper}>
          <i className={classNames('glyphfont', 'turku-logo', styles.logo)} />
        </div>
        <ul role="menu" className={styles.menu} aria-label="Sidebar">
          {menuItems.map(item =>
            <li role="presentation" className={this.calcMenuWrapperStyle(item.url)} key={item.id}>
              <Link to={item.url} role="menuitem" onClick={this.handleItemClick} className={styles.menuItemLink}>
                <span className={styles.iconWrapper}>
                  <i className={classNames('glyphfont', item.icon, styles.menuIcon)} />
                </span>
                {item.label}
              </Link>
              {item.subitems &&
              <ul className={styles.submenu}>
                {item.subitems.map(subitem =>
                  <li
                    key={subitem.id}
                    role="presentation"
                    className={
                      classNames(
                        styles.menuSubitem,
                        this.calcSubmenuStyle(subitem.id)
                      )
                    }
                  >
                    <ScrollLink
                      to={subitem.id}
                      onClick={this.handleItemClick}
                      smooth
                      duration={250}
                      role="menuitem"
                    >
                      <span>{subitem.label}</span>
                      {!isNaN(subitem.badge) && subitem.badge !== 0 &&
                      <Badge className={styles.badge}>
                        {currencyFormatter.format(subitem.badge, { locale: 'fi-FI' })}
                      </Badge>}
                    </ScrollLink>
                  </li>)
                }
              </ul>}
            </li>)
          }
        </ul>
      </div>
    );
  }
}

SideBar.contextTypes = {
  router: routerShape
};

SideBar.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  budget: PropTypes.shape({
    sectionsSpentBudget: PropTypes.objectOf(PropTypes.number),
  }).isRequired,
  currentSection: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]).isRequired,
  hideMenu: PropTypes.func,
  reportName: PropTypes.string,
  scrollPageToTop: PropTypes.func,
};

SideBar.defaultProps = {
  assignment: null,
  hideMenu: () => {},
  reportName: '',
  scrollPageToTop: () => {},
};


export default SideBar;
