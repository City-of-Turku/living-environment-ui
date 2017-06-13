import React from 'react';
import PropTypes from 'prop-types';
import { Badge, ProgressBar } from 'react-bootstrap';
import { Field } from 'redux-form';
import classnames from 'classnames';
import currencyFormatter from 'currency-formatter';

import { renderField } from '../../../components/helpers/formHelpers';
import * as Validation from '../../../validation';
import config from '../../../config';


import styles from './BudgetingTextTask.less';

const { backendImages: { baseUrl } } = config;

const fieldToNumber = value => parseFloat(value || 0);

const BudgetingTextTask = ({ className, progress, targetValuesMap, task }) => (
  <div className={classnames(styles.root, className)}>
    <h3>{task.data.name}</h3>
    <div className={styles.progressBarWrapper}>
      <ProgressBar
        now={progress.value}
        bsStyle={progress.completed ? 'success' : 'danger'}
        className={classnames(styles.progressBar, {
          [styles.progressBarIncomplete]: !progress.completed })}
      />
      <span className={progress.completed ? styles.progressLabelSuccess : styles.progressLabelDanger}>
        {progress.label}
      </span>
    </div>
    {
    task.data.targets.map(target => (<div key={target.id} className={styles.targetRoot}>
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: `url(${baseUrl + target.icon})` }}
      />
      <h4>{target.name}</h4>
      <div className={styles.priceWrapper}>
        <Badge className={styles.price}>{currencyFormatter.format(
          target.unit_price,
          { locale: 'fi-FI' })} / {task.data.unit}</Badge>
      </div>
      <div className={styles.fieldWrapper}>
        <Field
          className={classnames('form-group', styles.field)}
          name={`budgeting_text_task_${task.id}_${target.id}`}
          placeholder="" min="0"
          component={renderField} type="number"
          suppressErrors
          validate={[Validation.number, value =>
            Validation.range(value, Number(target.min_amount), Number(target.max_amount))]}
        />
      </div>
      <div className={styles.info}>
        <i className="fa fa-exclamation-circle" /> Nykyinen määrä: {fieldToNumber(targetValuesMap[target.id])} {task.data.unit}
      </div>
      <div className={styles.footer}>
        <span className={styles.totalLabel}>Yhteensä</span>
        <span className={styles.total}>
          {currencyFormatter.format(target.unit_price * (fieldToNumber(targetValuesMap[target.id])),
            { locale: 'fi-FI' })}
        </span>
      </div>
    </div>))
  }
  </div>);

BudgetingTextTask.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  task: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      targets: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        max_amount: PropTypes.string.isRequired, // server returns string here
        min_amount: PropTypes.string.isRequired, // -- / --
        name: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  targetValuesMap: PropTypes.objectOf(PropTypes.string).isRequired,
};

BudgetingTextTask.defaultProps = {
  className: '',
};

export default BudgetingTextTask;
