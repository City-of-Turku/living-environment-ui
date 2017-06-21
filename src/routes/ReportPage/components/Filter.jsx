import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';

import { renderField } from '../../../components/helpers/formHelpers';

import styles from './Filter.less';

class Filter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      schoolClasses: []
    };
    // Bind handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, newValue) {
    const { schools } = this.props;
    const result = schools.find(school => `${school.id}` === newValue);
    this.setState({ schoolClasses: result ? result.classes : [] });
  }

  handleSubmit() {
    const { updateFilter } = this.props;
    updateFilter();
  }

  render() {
    const { schools } = this.props;
    const { schoolClasses } = this.state;
    return (
      <div className={styles.root}>
        <h2 className={`no-separator h3 ${styles.title}`}>Suodattimet</h2>
        <form>
          <Row>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
              <Field
                name="schoolClass"
                label={'Luokka'}
                placeholder="Valitse luokka"
                component={renderField} type="select"
                options={schoolClasses}
                optionsKey="id"
                optionsValue="name"
              />
            </Col>
          </Row>
          <Button onClick={this.handleSubmit}>Suodata</Button>
        </form>
      </div>
    );
  }
}

Filter.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    classes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  })).isRequired,
  updateFilter: PropTypes.func.isRequired,
};


export default reduxForm({
  form: 'filter',
})(Filter);
