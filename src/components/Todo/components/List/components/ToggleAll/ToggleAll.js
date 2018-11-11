import React from 'react';

export default ({ isAllCompleted, onToggleAll }) => (
  <>
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      onChange={onToggleAll}
      checked={isAllCompleted}
    />
    <label for="toggle-all">Mark all as complete</label>
  </>
);
