import React, { useEffect, useState } from 'react'

import {RiDeleteBinLine} from 'react-icons/ri'

import '../index.css'

type Todo = {
    id: number,
    text: string,
    completed: boolean
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        {id: 1, text: "Learn MUI", completed:true},
        {id: 2, text: "Learn RTK Query", completed:true},
        {id: 3, text: "Learn Typescript", completed:false},
        {id: 4, text: "Learn Typescript with implentation of React", completed:false},
    ]);
    const [input, setInput] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage("");
        }, 3000)
    }, [errorMessage, setErrorMessage])


    const handleAdd = () => {

        if(!input){
            setErrorMessage('Please input a todo.')
        } else {
            const newTodo: Todo = {id: Date.now(), text: input, completed: false};
            setTodos([...todos, newTodo])
            setInput('')
        }
    }

    const handleDoneToggle = (id:number) => {
        setTodos(
        todos.map((prevTodo) => {
            if(prevTodo.id === id){
                return {
                    ...prevTodo,
                    completed: !prevTodo.completed
                }
            }
            // console.log(`updated status of ${id}` ,prevTodo.completed)
            return prevTodo;
        })
        )
    }

    const handleDelete = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        console.log(todos)
    }

  return (
    <div className='main-container'>
        <div className='title-container'>
        <h2>TodoList using Typescript + React</h2>
        </div>
        <div className='body-container'>
            <div className='flex-gap'>
                <input
                    type="text" 
                    placeholder='Add todo item'
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)} />
                <button onClick={handleAdd}>+ Add</button>
            </div>
            <div>
                { errorMessage && <p style={{color:'red', fontSize: '12px'}}>* {errorMessage}</p>}
            </div>
            <div className='todo-container'>
                <ul>
                {todos.map((todo) => (
                    <div className='each-todo' key={todo.id}
                    >
                        <li 
                        className={`default-style ${todo.completed ? 'completed-task' : 'incomplete-task'}`}
                        onClick={() => handleDoneToggle(todo.id)}
                        >{todo.text}</li>

                        <RiDeleteBinLine 
                        className='icon-styles'
                        onClick={() => handleDelete(todo.id)}/>
                    </div>
                    
                ))}
                </ul>
                
            </div>
        </div>
    </div>
  )
}

export default TodoList