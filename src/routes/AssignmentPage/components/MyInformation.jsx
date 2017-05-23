import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { renderField } from '../../../components/helpers/formHelpers';

class MyInformation extends Component {

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
      <h2 className="no-separator">Minun tietoni</h2>
      <Field
        name="school"
        label={'Koulu'}
        placeholder="Valitse koulu"
        component={renderField} type="select"
        options={schools}
        optionsKey="id"
        optionsValue="name"
        onChange={this.handleChange}
      />

      <Field
        name="schoolClass"
        label={'Luokka'}
        placeholder="Valitse luokka"
        component={renderField} type="select"
        options={schoolClasses}
        optionsKey="id"
        optionsValue="name"
      />
    </div>);
  }
}

MyInformation.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    classes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  })).isRequired,
};

export default MyInformation;
