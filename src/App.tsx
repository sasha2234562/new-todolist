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
                />
            })}
        </div>
    );
}

export default App;
