import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import uuid from 'uuid/v4';
import Footer from './components/Footer';
import List from './components/List';
import NewTodo from './components/NewTodo';

const Todo = ({ todos: todosProp, show, onListChange = () => {} }) => {
  const [todos, setTodos] = useState(todosProp);
  useEffect(() => {
    onListChange(todos);
  });

  function handleAddTodo(description) {
    const updatedTodos = { ...todos, [uuid()]: { description, completed: false } };
    setTodos(updatedTodos);
  }

  function handleUpdateTodo(id, description) {
    const updatedTodos = { ...todos };
    updatedTodos[id].description = description;

    setTodos(updatedTodos);
  }

  function hangleToggleTodo(id) {
    const updatedTodos = { ...todos };
    updatedTodos[id].completed = !todos[id].completed;

    setTodos(updatedTodos);
  }

  function handleToggleAll() {
    const updatedTodos = Object.entries(todos).reduce((newTodos, [id, todo]) => {
      const updatedTodo = { ...todo, completed: !isAllCompleted() };
      return { ...newTodos, [id]: updatedTodo };
    }, {});

    setTodos(updatedTodos);
  }

  function handleRemoveTodo(id) {
    const updatedTodos = { ...todos };
    delete updatedTodos[id];

    setTodos(updatedTodos);
  }

  function handleRemoveCompleted() {
    const updatedTodos = Object.entries(todos).reduce((newTodos, [id, todo]) => {
      if (todo.completed) {
        return newTodos;
      }
      return { ...newTodos, [id]: todo };
    }, {});

    setTodos(updatedTodos);
  }

  function numberTotalItems() {
    return Object.keys(todos).length;
  }

  function numberCompletedItems() {
    return Object.values(todos).filter(({ completed }) => completed).length;
  }

  function numberItemsLeft() {
    return numberTotalItems() - numberCompletedItems();
  }

  function isAllCompleted() {
    return numberTotalItems() === numberCompletedItems();
  }

  let todosToDisplay = Object.entries(todos).map(([id, todo]) => ({ id, ...todo }));
  if (show) {
    todosToDisplay = todosToDisplay.filter(({ completed }) => {
      if (show === 'active') {
        return !completed;
      } else if (show === 'completed') {
        return completed;
      }
      throw Error(`Invalid show prop: ${show}`);
    });
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo onNewTodo={handleAddTodo} />
      </header>
      <main className="main">
        <List
          todos={todosToDisplay}
          isAllCompleted={isAllCompleted()}
          onToggleTodo={hangleToggleTodo}
          onToggleAll={handleToggleAll}
          onRemoveTodo={handleRemoveTodo}
          onUpdateTodo={handleUpdateTodo}
        />
      </main>
      <footer className="footer">
        <Footer
          totalItems={numberTotalItems()}
          itemsLeft={numberItemsLeft()}
          onRemoveCompleted={handleRemoveCompleted}
        />
      </footer>
    </section>
  );
};

Todo.propTypes = {
  todos: PropTypes.object.isRequired,
  show: PropTypes.oneOf(['active', 'completed']),
  onListChange: PropTypes.func,
};

export default Todo;

// export default class Todo extends React.Component {
//   state = {
//     todos: this.props.todos,
//   };

//   static propTypes = {
//     todos: PropTypes.object.isRequired,
//     show: PropTypes.oneOf(['active', 'completed']),
//     onListChange: PropTypes.func,
//   };

//   componentDidUpdate() {
//     if (this.props.onListChange) {
//       this.props.onListChange(this.state.todos);
//     }
//   }

//   handleAddTodo = (description) => {
//     const { todos: originalTodos } = this.state;
//     const todos = { ...originalTodos, [uuid()]: { description, completed: false } };
//     this.setState({ todos });
//   };

//   handleUpdateTodo = (id, description) => {
//     const todos = { ...this.state.todos };
//     todos[id].description = description;

//     this.setState({ todos });
//   };

//   hangleToggleTodo = (id) => {
//     const todos = { ...this.state.todos };
//     todos[id].completed = !this.state.todos[id].completed;

//     this.setState({ todos });
//   };

//   handleToggleAll = () => {
//     const { todos: originalTodos } = this.state;

//     const todos = Object.entries(originalTodos).reduce((newTodos, [id, todo]) => {
//       const updatedTodo = { ...todo, completed: !this.isAllCompleted };
//       return { ...newTodos, [id]: updatedTodo };
//     }, {});

//     this.setState({ todos });
//   };

//   handleRemoveTodo = (id) => {
//     const todos = { ...this.state.todos };
//     delete todos[id];
//     this.setState({ todos });
//   };

//   handleRemoveCompleted = () => {
//     const { todos: originalTodos } = this.state;

//     const todos = Object.entries(originalTodos).reduce((newTodos, [id, todo]) => {
//       if (todo.completed) {
//         return newTodos;
//       }
//       return { ...newTodos, [id]: todo };
//     }, {});

//     this.setState({ todos });
//   };

//   get numberTotalItems() {
//     return Object.keys(this.state.todos).length;
//   }

//   get numberCompletedItems() {
//     return Object.values(this.state.todos).filter(({ completed }) => completed).length;
//   }

//   get numberItemsLeft() {
//     return this.numberTotalItems - this.numberCompletedItems;
//   }

//   get isAllCompleted() {
//     return this.numberTotalItems === this.numberCompletedItems;
//   }

//   render() {
//     const { show } = this.props;
//     let todos = Object.entries(this.state.todos).map(([id, todo]) => ({ id, ...todo }));

//     if (show) {
//       todos = todos.filter(({ completed }) => {
//         if (show === 'active') {
//           return !completed;
//         } else if (show === 'completed') {
//           return completed;
//         }
//         throw Error(`Invalid show prop: ${show}`);
//       });
//     }

//     return (
//       <section className="todoapp">
//         <header className="header">
//           <h1>todos</h1>
//           <NewTodo onNewTodo={this.handleAddTodo} />
//         </header>
//         <main className="main">
//           <List
//             todos={todos}
//             isAllCompleted={this.isAllCompleted}
//             onToggleTodo={this.hangleToggleTodo}
//             onToggleAll={this.handleToggleAll}
//             onRemoveTodo={this.handleRemoveTodo}
//             onUpdateTodo={this.handleUpdateTodo}
//           />
//         </main>
//         <footer className="footer">
//           <Footer
//             totalItems={this.numberTotalItems}
//             itemsLeft={this.numberItemsLeft}
//             onRemoveCompleted={this.handleRemoveCompleted}
//           />
//         </footer>
//       </section>
//     );
//   }
// }
