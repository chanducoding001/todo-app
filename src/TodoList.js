    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import './TodoList.css';
//installed axios to fetch api
    const TodoList = () => {
//taking 4 states one is to store todos from api,another is adding a todo, another two are for storing editing id and editing title
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoTitle, setEditingTodoTitle] = useState('');
//useEffect calling fetch todo function
    useEffect(() => {
    fetchTodos();
    }, []);
//fetching todos using axios and storing in todos state array and also handling errors
    const fetchTodos = async () => {
    try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    setTodos(response.data);
    } catch (error) {
    console.error('Error fetching todos:', error);
    }
    };
//posting data using axios post request where the title is getting the input value.
    const addTodo = async () => {
    try {
    if (newTodo.trim() === '') return;

    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: newTodo,
    completed: false,
    });
//adding posted data to fetched todos from api to combine both of from api and user added todos

    setTodos([...todos, response.data]);
//after addition of todo to api fetched data, setting input value to empty
    setNewTodo('');
    } catch (error) {
    console.error('Error adding todo:', error);
    }
    };
// put requests using axios
    const updateTodo = async (id, title) => {
    try {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    title,
    });

    const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
    return {
    ...todo,
    title,
    };
    }
    return todo;
    });

    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoTitle('');
    } catch (error) {
    console.error('Error updating todo:', error);
    }
    };
//deleting particular todo using id i.e.filtering todos excluding deleted todo id and storing in todo to display filtered products
    const deleteTodo = async (id) => {
    try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
    console.error('Error deleting todo:', error);
    }
    };

    //   const toggleComplete = (id) => {
    //     const updatedTodos = todos.map((todo) => {
    //       if (todo.id === id) {
    //         return {
    //           ...todo,
    //           completed: !todo.completed,
    //         };
    //       }
    //       return todo;
    //     });

    //     setTodos(updatedTodos);
    //   };


//in ui part inside li checkbox, todo title, edit ,delete buttons will be there
//on clicking edit button, it will call setTodoId function taking that particular li id as argument.
// so initially condition rendering happening i.e if edit button is clicked one li otherwise another li with input,save,cancel buttons
//on clicking save button it will call update todo function taking that particular id and edited input value as parameters
//this update todo function will update the li

    return (
    <div className="container">
    <h1 className="title">Todo List</h1>
    <div className="add-todo">
    <input
    type="text"
    value={newTodo}
    onChange={(e) => setNewTodo(e.target.value)}
    placeholder="Enter a new todo"
    className="todo-input"
    />
    <button onClick={addTodo} className="add-button">
    Add Todo
    </button>
    </div>
    <ul className="todo-list">
    {todos.map((todo) => (
    <li key={todo.id} className="todo-item">
    {editingTodoId === todo.id ? (
    <>
        <input
        type="text"
        value={editingTodoTitle}
        onChange={(e) => setEditingTodoTitle(e.target.value)}
        className="edit-input"
        />
        <button className="save-button" onClick={() => updateTodo(todo.id, editingTodoTitle)}>
        Save
        </button>
        <button className="cancel-button" onClick={() => setEditingTodoId(null)}>
        Cancel
        </button>
        </>
    ) : (
    <>
        <input
        type="checkbox"
        //   checked={todo.completed}
        //   onChange={() => toggleComplete(todo.id)}
        className="checkbox"
        
        />
        <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
        <button className="edit-button" onClick={() => setEditingTodoId(todo.id)}>
        Edit
        </button>
        <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
        Delete
        </button>
    </>
    )}
    </li>
    ))}
    </ul>
    </div>
    );
    };

    export default TodoList;
