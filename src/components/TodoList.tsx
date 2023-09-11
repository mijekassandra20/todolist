import React, { useEffect, useState } from 'react'

// imported packages
import {RiDeleteBinLine, RiEditLine} from 'react-icons/ri'
import Swal from "sweetalert2";

// imported files
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
        {id: 4, text: "Learn Typescript with implementation of React", completed:false},
    ]);
    const [input, setInput] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('')
    // const [editModal, setEditModal] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage("");
        }, 3000)
    }, [errorMessage, setErrorMessage])

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

    const handleAdd = () => {
        if(!input){
            setErrorMessage('Please input a todo.')
        } else {
            const newTodo: Todo = {id: Date.now(), text: input, completed: false};
            setTodos([...todos, newTodo])
            setInput('')
        }
    }

    const handleEditToggle = async (id:number, todoText:string) => {
        if(id){
            const { value: editedText } = await Swal.fire({
                input: 'textarea',
                inputLabel: 'Edit',
                inputValue: `${todoText}`,
                inputAttributes: {
                  'aria-label': 'Type your text here'
                },
                showCancelButton: true
              })
              
              if (editedText) {
                const updatedTodos = todos.map((todo) => {
                    if(todo.id === id) {
                        return {
                            ...todo,
                            text: editedText
                        }
                    }
                    return todo;
                })
                setTodos(updatedTodos);
              }
        }
    }

    const handleDelete = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        console.log(todos)
    }

  return (
    <div className='main-container'>
        <div className='title-container'>
        <h2>Todo App using Typescript + React</h2>
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

                        <div className='icon-container'>
                            <RiEditLine 
                                className='icon-styles'
                                onClick={() => handleEditToggle(todo.id, todo.text)}
                            />
                            <RiDeleteBinLine 
                            className='icon-styles'
                            onClick={() => handleDelete(todo.id)}/>
                        </div>
                       
                    </div>
                    
                ))}
                </ul>
                
            </div>
        </div>
    </div>
  )
}

export default TodoList