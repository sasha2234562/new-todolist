import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./todolist";
import {v1} from "uuid";


function App() {


    let todolistIdOne = v1();
    let todolistIdTwo = v1();
    let [tasksObj, setTasksObj] = useState({
        [todolistIdOne]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistIdTwo]: [
            {id: v1(), title: "Meat", isDone: true,},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cats", isDone: false}
        ]
    });
    let [todolists, setTodolists] = useState([
        {id: todolistIdOne, title: "What to learn", filter: 'active'},
        {id: todolistIdTwo, title: "I need to bye today", filter: 'completed'},
    ])
    const addTask = (titleInput: string, todoId: string) => {
        let tasks = tasksObj[todoId];
        if (titleInput !== '') {
            let task = {
                id: v1(),
                title: titleInput,
                isDone: true
            }
            let newTask = [task, ...tasks]
            tasksObj[todoId] = newTask
            setTasksObj({...tasksObj})

        }

    }
    const removeTask = (todoId: string, id: string) => {
        let tasks = tasksObj[todoId];
        let filterTask = tasks.filter(item => item.id !== id)
        tasksObj[todoId] = filterTask
        setTasksObj({...tasksObj})

    }

    const changeStatus = (todoId: string, id: string, isDone: boolean) => {
        let tasks = tasksObj[todoId];
        let task = tasks.find(item => item.id === id)
        if (task) {
            task.isDone = isDone;

            setTasksObj({...tasksObj})
        }
    }
    const removeTodolist = (todoId: string) => {
        let todolist = todolists.filter(item => item.id !== todoId);
        setTodolists(todolist);
        delete tasksObj[todoId];
        setTasksObj(tasksObj)
    }

    const changeTaskTitle = (newValue: string, todoId: string, id: string) => {
        let tasks = tasksObj[todoId];
        let find = tasks.find(item => item.id === id);
        if (find) {
            find.title = newValue;
        }
        setTasksObj({...tasksObj})
    }
    const todolistTitle = (todoId: string, newValue: string) => {
        let task = todolists.find(item => item.id === todoId);
        if(task) {
            task.title = newValue
        }
        setTodolists([...todolists])
    }
    return (
        <div className="App">
            {todolists.map((item) => {


                let tasksForTodolist = tasksObj[item.id]
                return <Todolist
                    key={item.id}
                    title={item.title}
                    todoId={item.id}
                    task={tasksForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    todolistTitle={todolistTitle}
                />
            })}
        </div>
    );
}

export default App;
