import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Map from '../../../components/Map';
import { addFriend, friendsOfParkMapClicked, cleanInvalidFriends,
  deleteFriend, updateFriend } from '../actions/friendsOfParkMap';

const mapStateToProps = (state, ownProps) => ({
  maskPolygon: ownProps.maskPolygon,
  friends: state.friendsOfParkMap.friends,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleAddFriend: friendDetails => addFriend(friendDetails),
  handleFriendsOfParkDialogClosed: () => cleanInvalidFriends(),
  handleDeleteFriend: friendId => deleteFriend(friendId),
  handleUpdateFriend: (friendId, friend) => updateFriend(friendId, friend),
  handleMapClick: (lat, lng, task) => friendsOfParkMapClicked(lat, lng, task.id),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
