import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ListGroup, ListGroupItem } from 'react-bootstrap';

import styles from './BudgetingMapTargetList.less';

const findTargetById = (id, task) => task.targets.filter(target => target.id === id)[0];

class BudgetingMapTargetList extends Component {

  constructor(props) {
    super(props);
    const { selectedTarget, task } = this.props;
    const initialSelectedTarget = selectedTarget ? findTargetById(selectedTarget.id, task) : null;
    this.state = {
      selectedTarget: initialSelectedTarget,
      // whether we creating the new marker or editing the existing one
      addNewTarget: initialSelectedTarget === null,
    };
    // leaflet popup is not managed by react. We need to know when the popup is closed by leaflet
    // (for example when a user click somewhere on the map). This flag will prevent that "regular" closing
    // of the popup (some action button like Update is pressed) fire the "dialog closed" event
    // In the future, this functionality might me moved to a custom Popup component
    // note: leaflet Popup and this component are in the "composition" relation
    this.handleDialogClose = true;
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  componentWillUnmount() {
    const { onDialogClosed, task } = this.props;
    if (onDialogClosed && this.handleDialogClose) {
      onDialogClosed(task);
    }
    // we don't need to set the value of this.handleDialogClose to true as the component lifecycle is done here
  }

  handleDeleteClick() {
    const { onDelete } = this.props;
    if (onDelete) {
      this.handleDialogClose = false;
      onDelete(this.state.selectedTarget);
    }
  }

  handleSaveClick() {
    const { onSave } = this.props;
    if (onSave) {
      this.handleDialogClose = false;
      onSave(this.state.selectedTarget);
    }
  }

  handleUpdateClick() {
    const { onUpdate } = this.props;
    if (onUpdate) {
      this.handleDialogClose = false;
      onUpdate(this.state.selectedTarget);
    }
  }

  handleItemClick(target) {
    this.setState({ selectedTarget: target });
  }

  render() {
    const { task } = this.props;
    const { addNewTarget, selectedTarget } = this.state;
    return (<div>
      <div className={styles.firstPage}>
        <ListGroup className={styles.list}>
          {
            task.targets.map(
              target => (<ListGroupItem
                active={selectedTarget === target}
                className={styles.listItem}
                key={target.id}
                onClick={() => this.handleItemClick(target)}
              >
                {target.name}
              </ListGroupItem>))
          }
        </ListGroup>
        <div className={styles.footer}>
          { addNewTarget && (<Button
            bsStyle="primary"
            disabled={!selectedTarget}
            onClick={this.handleSaveClick}
          >Add</Button>)}
          { !addNewTarget && (<ButtonGroup>
            <Button
              bsStyle="danger"
              onClick={this.handleDeleteClick}
            >Delete</Button>
            <Button
              bsStyle="success"
              disabled={!selectedTarget}
              onClick={this.handleUpdateClick}
            >Update</Button>
          </ButtonGroup>)}
        </div>
      </div>
    </div>);
  }
}

BudgetingMapTargetList.propTypes = {
  onDelete: PropTypes.func,
  onDialogClosed: PropTypes.func,
  onSave: PropTypes.func,
  onUpdate: PropTypes.func,
  selectedTarget: PropTypes.shape({
  }),
  task: PropTypes.shape({
  }).isRequired,
};

BudgetingMapTargetList.defaultProps = {
  onDelete: null,
  onDialogClosed: null,
  onSave: null,
  onUpdate: null,
  selectedTarget: null,
};

export default BudgetingMapTargetList;
