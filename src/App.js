import queryString from 'query-string';
import { useEffect, useState } from 'react';
import './App.scss';
import Pagination from './components/Pagination';
import PostFiltersForm from './components/PostFiltersForm';
// import TodoForm from './components/TodoForm';
// import TodoList from './components/TodoList';
// import ColorBox from './components/ColorBox/index';
import PostList from './components/PostList';

function App() {

    // const [todoList, setTodoList] = useState(
    //     [
    //         { id: 1, title: 'A' },
    //         { id: 2, title: 'B' },
    //         { id: 3, title: 'C' },
    //     ]
    // );

    // function handleTodoClick(todo) {
    //     const index = todoList.findIndex(x => x.id === todo.id);
    //     if (index < 0) return;
    //     const newTodoList = [...todoList];
    //     newTodoList.splice(index, 1);
    //     setTodoList(newTodoList);
    // }

    // function handleTodoFormSubmit(formValue) {
    //     const newTodoList = [...todoList];
    //     newTodoList.push({ id: newTodoList.length + 1, ...formValue })
    //     setTodoList(newTodoList);
    // }

    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 11
    });
    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1,
        title_like: '',
    })

    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramsString = queryString.stringify(filters);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                const { data, pagination } = responseJSON;
                setPostList(data);
                setPagination(pagination);
                console.log({ filters });
            } catch (error) {
                console.log('Failed to fetch post list', error.message);
            }
        }
        fetchPostList();
    }, [filters]);

    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            _page: newPage
        });
    }

    function handleFiltersChange(newFilters) {
        setFilters({
            ...filters,
            _page: 1,
            title_like: newFilters.searchTerm
        })
    }


    return (
        <div className="app">
            <h1>Demo Reack Hook</h1>
            {/* <ColorBox /> */}
            {/* <TodoForm onSubmit={handleTodoFormSubmit} />
            <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
            <PostFiltersForm onSubmit={handleFiltersChange} />
            <PostList posts={postList} />
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    );
}

export default App;
