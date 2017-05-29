import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Map from '../components/Map';
import { addTarget, budgetingMapClicked, cleanInvalidTarget,
  deleteTarget, updateTarget } from '../actions/budgetingMap';

const mapStateToProps = (state, ownProps) => ({
  maskPolygon: ownProps.maskPolygon,
  targetUserData: state.budgetingMap.tasks[ownProps.task.id].targetUserData,
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  handleAddTarget: selectedTarget => addTarget(ownProps.sectionId, ownProps.task.id, selectedTarget),
  handleBudgetingMapTargetListDialogClosed: () => cleanInvalidTarget(ownProps.task.id),
  handleDeleteTarget: (targetId, selectedTarget) => deleteTarget(ownProps.task.id, targetId, selectedTarget),
  handleUpdateTarget: (targetId, selectedTarget) => updateTarget(ownProps.task.id, targetId, selectedTarget),
  handleMapClick: (lat, lng, task) => budgetingMapClicked(lat, lng, task.id),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
