import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { Field } from 'redux-form';
import classnames from 'classnames';

import { renderField } from '../../../components/helpers/formHelpers';
import * as Validation from '../../../validation';

import styles from './BudgetingTextTask.less';

const BudgetingTextTask = ({ className, task }) => (<div className={classnames(styles.root, className)}>
  <h4>{task.name}</h4>
  {
    task.targets.map(target => (<div key={target.id}>
      <Row>
        <Col sm={7} xs={12} smPush={5} className={styles.col}>
          {target.name}
        </Col>
        <Col sm={3} xs={12} smPull={5} className={styles.col}>
          <Field
            className={classnames('form-group', styles.field)}
            name={`budgeting_text_task_${target.id}`}
            placeholder="" min="0"
            component={renderField} type="number"
            suppressErrors
            validate={[Validation.number, value =>
              Validation.range(value, Number(target.min_amount), Number(target.max_amount))]}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={10} xs={12} smPush={2}>
          <Field
            name={`budgeting_text_task_${target.id}`}
            placeholder="" min="0"
            component={renderField} type="error"
            validate={[Validation.number, value =>
              Validation.range(value, Number(target.min_amount), Number(target.max_amount))]}
          />
        </Col>
      </Row>
    </div>))
  }
</div>);

BudgetingTextTask.propTypes = {
  className: PropTypes.string,
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    targets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      max_amount: PropTypes.number.isRequired,
      min_amount: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

BudgetingTextTask.defaultProps = {
  className: '',
};

export default BudgetingTextTask;
