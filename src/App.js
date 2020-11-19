import { useState } from 'react';
import './App.scss';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
// import ColorBox from './components/ColorBox/index';

function App() {
    const [todoList, setTodoList] = useState(
        [
            { id: 1, title: 'A' },
            { id: 2, title: 'B' },
            { id: 3, title: 'C' },
        ]
    );

    function handleTodoClick(todo) {
        const index = todoList.findIndex(x => x.id === todo.id);
        if (index < 0) return;
        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    function handleTodoFormSubmit(formValue) {
        const newTodoList = [...todoList];
        newTodoList.push({ id: newTodoList.length + 1, ...formValue })
        setTodoList(newTodoList);
    }

    console.log(todoList);

    return (
        <div className="app">
            <h1>Demo Reack Hook</h1>
            {/* <ColorBox /> */}
            <TodoForm onSubmit={handleTodoFormSubmit} />
            <TodoList todos={todoList} onTodoClick={handleTodoClick} />
        </div>
    );
}

export default App;
