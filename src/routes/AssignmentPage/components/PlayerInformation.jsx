import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { renderField } from '../../../components/helpers/formHelpers';

class PlayerInformation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      schoolClasses: []
    };
    // Bind handlers
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    const { schools } = this.props;
    const result = schools.find(school => `${school.id}` === newValue);
    this.setState({ schoolClasses: result ? result.classes : [] });
  }

  render() {
    const { schools } = this.props;
    const { schoolClasses } = this.state;
    return (<div>
      <Field
        name="school"
        label={'School'}
        placeholder="Select school"
        component={renderField} type="select"
        options={schools}
        optionsKey="id"
        optionsValue="name"
        onChange={this.handleChange}
      />

      <Field
        name="schoolClass"
        label={'Class'}
        placeholder="Select class"
        component={renderField} type="select"
        options={schoolClasses}
        optionsKey="id"
        optionsValue="name"
      />
    </div>);
  }
}

PlayerInformation.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    classes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  })).isRequired,
};

export default PlayerInformation;
