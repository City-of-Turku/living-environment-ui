import { connect } from 'react-redux';

import Layout from '../components/Layout';

const mapStateToProps = state => ({
  sideMenuShown: state.sideMenu.isShown,
});

export default connect(mapStateToProps)(Layout);
