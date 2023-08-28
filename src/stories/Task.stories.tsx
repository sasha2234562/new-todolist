import React from 'react'
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task',
    component: Task
}

const changeTaskStatus = action('changeTaskStatus')
const changeTaskTitle = action('changeTaskTitle')
const removeTask = action('removeTask')
export const TaskBaseExample = (props: any)=> {
    return (<>
            <Task
                task={{id: '1', isDone: true, title: 'CSS'}}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTask}
                todolistId={'todolistId 1'}
            />
            <Task
                task={{id: '2', isDone: false, title: 'CSS'}}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTask}
                todolistId={'todolistId 2'}
            />
        </>
    )
}

