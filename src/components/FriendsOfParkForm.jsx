import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import classnames from 'classnames';

import styles from './FriendsOfParkForm.less';

class FriendsOfParkForm extends Component {
  constructor(props) {
    super(props);

    const { friend } = props;
    this.fields = [
      'first_name',
      'last_name',
      'email',
      'phone',
    ];
    this.state = this.fields.reduce((acc, fieldName) => {
      acc[fieldName] = {
        value: friend.valid ? (friend.details || {})[fieldName] : '',
        validate: false,
      };
      return acc;
    }, {});

    // leaflet popup is not managed by react. We need to know when the popup is closed by leaflet
    // (for example when a user click somewhere on the map). This flag will prevent that "regular" closing
    // of the popup (some action button like Update is pressed) fire the "dialog closed" event
    // In the future, this functionality might me moved to a custom Popup component
    // note: leaflet Popup and this component are in the "composition" relation
    this.handleDialogClose = true;
    this.handleBlur = this.handleBlur.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  componentWillUnmount() {
    const { onDialogClosed } = this.props;
    if (onDialogClosed && this.handleDialogClose) {
      onDialogClosed();
    }
    // we don't need to set the value of this.handleDialogClose to true as the component lifecycle is done here
  }

  getGroupClass(fieldName) {
    const validate = this.state[fieldName].validate;
    return classnames(
      'form-group ',
      {
        [styles.error]: !this.isFieldValid(fieldName) && validate,
      }
    );
  }

  getFormFieldsValues() {
    return Object.keys(this.state).reduce((acc, fieldName) => {
      acc[fieldName] = this.state[fieldName].value;
      return acc;
    }, {});
  }

  isFieldValid(fieldName) {
    const value = (this.state[fieldName].value || '').trim();
    if (fieldName === 'email') {
      return /\S+@\S+\.\S+/.test(value);
    }
    return !!value;
  }

  isFormValid() {
    return Object.keys(this.state).reduce((acc, fieldName) => acc && this.isFieldValid(fieldName), true);
  }

  validateForm() {
    Object.keys(this.state).forEach(fieldName => this.setState({
      [fieldName]: { value: this.state[fieldName].value, validate: true },
    }));
  }

  handleDeleteClick() {
    const { onDelete } = this.props;
    if (onDelete) {
      this.handleDialogClose = false;
      onDelete();
    }
  }

  handleSaveClick() {
    const { onSave } = this.props;
    this.validateForm();
    if (this.isFormValid() && onSave) {
      this.handleDialogClose = false;
      const formFieldValues = this.getFormFieldsValues();
      onSave(formFieldValues);
    }
  }

  handleUpdateClick() {
    const { onUpdate } = this.props;
    this.validateForm();
    if (this.isFormValid() && onUpdate) {
      this.handleDialogClose = false;
      const formFieldValues = this.getFormFieldsValues();
      onUpdate(formFieldValues);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: { value, validate: true },
    });
  }

  handleBlur(fieldName) {
    this.setState({
      [fieldName]: { value: this.state[fieldName].value, validate: true },
    });
  }


  render() {
    const { friend: { valid } } = this.props;
    const addNewFriend = !valid;

    return (<div className={classnames('container-fluid', styles.root)}>
      <div className={this.getGroupClass('first_name')}>
        <label htmlFor="first_name">Etunimi</label>
        <input
          type="text"
          name="first_name"
          className="form-control"
          onBlur={() => this.handleBlur('first_name')}
          onChange={this.handleInputChange}
          value={this.state.first_name.value}
        />
      </div>
      <div className={this.getGroupClass('last_name')}>
        <label htmlFor="last_name">Sukunimi</label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          onBlur={() => this.handleBlur('last_name')}
          onChange={this.handleInputChange}
          value={this.state.last_name.value}
        />
      </div>
      <div className={this.getGroupClass('email')}>
        <label htmlFor="email">Sähköposti</label>
        <input
          type="text"
          name="email"
          className="form-control"
          onBlur={() => this.handleBlur('email')}
          onChange={this.handleInputChange}
          value={this.state.email.value}
        />
      </div>
      <div className={this.getGroupClass('phone')}>
        <label htmlFor="phone">Puhelin</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          onBlur={() => this.handleBlur('phone')}
          onChange={this.handleInputChange}
          value={this.state.phone.value}
        />
      </div>
      <div className={styles.footer}>
        { addNewFriend && (<Button
          bsStyle="primary"
          onClick={this.handleSaveClick}
        >Lisää</Button>)}
        { !addNewFriend && (<ButtonGroup>
          <Button
            bsStyle="danger"
            onClick={this.handleDeleteClick}
          >Poista</Button>
          <Button
            bsStyle="success"
            onClick={this.handleUpdateClick}
          >Päivitä</Button>
        </ButtonGroup>)}
      </div>
    </div>);
  }
}

FriendsOfParkForm.propTypes = {
  friend: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    valid: PropTypes.bool,
    details: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDialogClosed: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FriendsOfParkForm;
