import React from 'react';
import PropTypes from 'prop-types';

const BudgetingTask = ({ id, targets }) => (
  <div>
    <h3>{name}</h3>
    <div>Targets:</div>
    {
      targets.map(({
        name, unit_price: unitPrice, reference_amount: referenceAmount, min_amount: minAmount,
        max_amount: maxAmount, icon, amount_of_consumption: amountOfConsumption }) => (
          <tr>
            <td>{id}</td>
            <td><img src={icon} style={{ maxWidth: 30 }} alt="" /></td>
            <td>{name}</td>
            <td>{unitPrice}</td>
            <td>{referenceAmount}</td>
            <td>{minAmount}</td>
            <td>{maxAmount}</td>
            <td>{amountOfConsumption}</td>
          </tr>
      ))
    }
  </div>
);

BudgetingTask.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BudgetingTask;
