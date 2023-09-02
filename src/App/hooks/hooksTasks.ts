import {useState} from "react";
import {todolistId1, todolistId2} from "../../id/id";
import {v1} from "uuid";
import {TasksStateType} from "../App";

export function useTasks() {
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });
    return {tasks, setTasks}
}