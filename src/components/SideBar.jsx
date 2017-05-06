import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, routerShape } from 'react-router';

import styles from './SideBar.less';
import resolveToLocation from './helpers/routerHelper';
import createMenuItems from './helpers/sideBarContext';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.requestedMenuGeneration = false;
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: we didn't ensure that menu items change as the url is changed. It will be easier to
    // implement it when more routes are added to app
    const { assignment } = this.props;
    if (assignment && prevState === null && !this.requestedMenuGeneration) {
      const { router } = this.context;
      // `requestedMenuGeneration` ensures that the `createMenuItems` method is called just once.
      // The issue is that the `menuItems` state is set async as `createMenuItems` uses
      // the async method `route` so we can't rely only on condition A: `prevState === null`
      // (if `createMenuItems` was a sync method then it would be possible to use only  condition A)
      this.requestedMenuGeneration = true;
      createMenuItems(assignment, router)
      .then((menuItems) => {
        this.setState({ menuItems });
      });
    }
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

  render() {
    if (this.state === null) {
      return null;
    }
    const { menuItems } = this.state;
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
  assignment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  currentSection: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]).isRequired,
};

SideBar.defaultProps = {
  assignment: null,
};


export default SideBar;
