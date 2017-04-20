import React from 'react';
import PropTypes from 'prop-types';

const BudgetingTask = ({ id, name, unit, targets }) => (
  <div>
    <h3>{name}</h3>
    <div>Targets:</div>
    {
      targets.map( ({
        name, unit_price, reference_amount, min_amount, max_amount, icon, amount_of_consumption }) => (
        <tr>
          <td><img src={icon} style={{ maxWidth: 30 }} /></td>
          <td>{name}</td>
          <td>{unit_price}</td>
          <td>{reference_amount}</td>
          <td>{min_amount}</td>
          <td>{max_amount}</td>
          <td>{amount_of_consumption}</td>
        </tr>
      ))
    }
  </div>
)

BudgetingTask.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  targets: PropTypes.array.isRequired,
};

export default BudgetingTask;
