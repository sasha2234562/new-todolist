import {setTodolistsAC, todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";

test('todolists should be tothe state', ()=> {

    const state = [
        {id: v1(), title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: v1(), title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
    const action = setTodolistsAC(state)

    const  endState = todolistsReducer([], action)
    expect(endState.length).toBe(2)
})