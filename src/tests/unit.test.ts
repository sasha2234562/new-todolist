import {v1} from "uuid";
import {todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setTodolistsAC} from "../state/todolists-reducer";

test('todolists should be tothe state', ()=> {

    const state = [
        {id: v1(), title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: v1(), title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
    const action = setTodolistsAC([
        {id: '1', title: 'What to learn',  addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0}])

    // const  endState = tasksReducer({}, action)
    // expect(endState.length).toBe(2)
})


export const fetchTodolistThunk = (dispatch: Dispatch) => {
    todolistsAPI.getTodolists().then(res => dispatch(setTodolistsAC(res.data)))
}