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

const total = (target, targetValuesMap) => {
  const value = fieldToNumber(targetValuesMap[target.id]);
  if (value < target.min_amount || (target.max_amount && value > target.max_amount)) {
    return '';
  }
  return currencyFormatter.format(target.unit_price * value,
    { locale: 'fi-FI' });
};

function budgetingProgressBar(progress, task) {
  if (task.data.amount_of_consumption > 0) {
    return (<div className={styles.progressBarWrapper}>
      <ProgressBar
        now={progress.value}
        bsStyle={progress.completed ? 'success' : 'danger'}
        className={classnames(styles.progressBar, {
          [styles.progressBarIncomplete]: !progress.completed })}
      />
      <span className={progress.completed ? styles.progressLabelSuccess : styles.progressLabelDanger}>
        Käytetty {progress.label} {task.data.unit}
      </span>
    </div>);
  }
  return null;
}

const BudgetingTextTask = ({ className, progress, targetValuesMap, task }) => (
  <div className={classnames(styles.root, className)}>
    <h3>{task.data.name}</h3>
    { budgetingProgressBar(progress, task) }
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
          defaultValue={parseInt(target.reference_amount, 10)}
          placeholder="" min="0"
          component={renderField} type="number"
          validate={[Validation.number, value =>
            Validation.range(value,
              Number(target.min_amount), target.max_amount ? Number(target.max_amount) : 1e99)
            && 'Et voi asettaa arvoa, koska se ei ole sallittu.']}
        />
        <div className={styles.range}>
          {
            target.max_amount &&
            <span>Sallittu arvo {target.min_amount}  - {target.max_amount} {task.data.unit}</span>
          }
          {
            !target.max_amount &&
            <span>Sallittu arvo vähintään {target.min_amount} {task.data.unit}</span>
          }
        </div>
      </div>
      <div className={styles.info}>
        <i className="fa fa-exclamation-circle" /> Nykyinen määrä: {target.reference_amount} {task.data.unit}
      </div>
      <div className={styles.footer}>
        <span className={styles.total}>
          {total(target, targetValuesMap)}
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
