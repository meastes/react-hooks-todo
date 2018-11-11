import PropTypes from 'prop-types';
import React from 'react';

const ToggleAll = ({ isAllCompleted, onToggleAll }) => (
  <>
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      onChange={onToggleAll}
      checked={isAllCompleted}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </>
);

ToggleAll.propTypes = {
  isAllCompleted: PropTypes.bool.isRequired,
  onToggleAll: PropTypes.func.isRequired,
};

export default ToggleAll;
