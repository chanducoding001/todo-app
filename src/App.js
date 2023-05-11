import React from 'react';
import TodoList from './TodoList';


function App() {
  return (
    <div className="App">
      {/* rendering todolist component in parent app component  */}
      <TodoList />
    </div>
  );
}

export default App;
