import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Field } from 'redux-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './OpenTextTask.less';
import { renderField } from '../../../components/helpers/formHelpers';

const OpenTextTask = ({ className, data, id }) => (
  <div className={className}>
    <Row>
      <Col xs={12} sm={2} className={styles.iconWrapper}>
        <i className={classNames('glyphfont', 'icon-edit', styles.editIcon)} />
      </Col>
      <Col xs={12} sm={8}>
        {data.question}
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={8} smOffset={2} className={classNames('form-group', styles.inputFieldWrapper)}>
        <Field
          name={`open_text_task_${id}`}
          placeholder=""
          component={renderField} type="textarea"
        />
      </Col>
    </Row>
  </div>
);

OpenTextTask.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
};

OpenTextTask.defaultProps = {
  className: '',
};

export default OpenTextTask;
