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
      <Col lg={8} lgOffset={2} className={styles.question}>
        <div className={styles.iconWrapper}>
          <i className={classNames('glyphfont', 'icon-edit', styles.editIcon)} />
        </div>
        {data.question}
      </Col>
    </Row>
    <Row>
      <Col lg={8} lgOffset={2} className={classNames('form-group', styles.inputFieldWrapper)}>
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
