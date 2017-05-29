import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, routerShape } from 'react-router';
import { Link as ScrollLink } from 'react-scroll';
import { Badge } from 'react-bootstrap';

import styles from './SideBar.less';
import resolveToLocation from './helpers/routerHelper';
import createMenuItems from './helpers/sideBarMenu';

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
    const { assignment, budget } = this.props;
    if (!assignment) {
      return null;
    }
    const menuItems = createMenuItems(assignment, budget);
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
                  <Link to={item.url} role="menuitem" className={styles.menuItemLink}>
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
                          <ScrollLink to={subitem.id} smooth offset={-20} duration={250} role="menuitem">
                            {subitem.label}
                            {subitem.badge > 0 && <Badge className={styles.badge}>{subitem.badge} EUR</Badge>}
                          </ScrollLink>
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
};

SideBar.defaultProps = {
  assignment: null,
};


export default SideBar;
