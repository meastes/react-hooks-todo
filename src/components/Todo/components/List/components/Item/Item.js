import PropTypes from 'prop-types';
import React from 'react';

export default class Item extends React.Component {
  state = {
    editing: false,
    updatedDescription: this.props.children,
  };

  static propTypes = {
    completed: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  handleUpdateDescription = (event) => {
    this.setState({ updatedDescription: event.currentTarget.value });
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleBlur = () => {
    this.props.onUpdate(this.state.updatedDescription);
    this.setState({ editing: false });
  };

  handleKeypress = (event) => {
    if (event.key === 'Enter') {
      this.props.onUpdate(this.state.updatedDescription);
      this.setState({ editing: false });
    }
  };

  render() {
    const { children, completed, onToggle, onRemove } = this.props;
    const { editing, updatedDescription } = this.state;

    let className = '';
    if (editing) {
      className = 'editing';
    } else if (completed) {
      className = 'completed';
    }

    return (
      <li className={className}>
        {!editing && (
          <div className="view">
            <input className="toggle" type="checkbox" checked={completed} onChange={onToggle} />
            <label onDoubleClick={this.handleDoubleClick}>{children}</label>
            <button className="destroy" onClick={onRemove} />
          </div>
        )}
        {editing && (
          <input
            className="edit"
            value={updatedDescription}
            onChange={this.handleUpdateDescription}
            onKeyPress={this.handleKeypress}
            onBlur={this.handleBlur}
            autoFocus
          />
        )}
      </li>
    );
  }
}
