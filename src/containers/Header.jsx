import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu } from '../actions/sideMenu';

import Header from '../components/Header';

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    toggleMenu,
  }, dispatch);

export default connect(undefined, mapDispatchToProps)(Header);
