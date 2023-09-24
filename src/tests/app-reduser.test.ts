import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "../app/app-reduser";


test('correct error should be sed', () => {
    const startState: InitialStateType = {
        status: 'idle',
        error: null
    }
    const endState = appReducer(startState, setAppErrorAC('some error'))
    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const startState: InitialStateType = {
        status: 'idle',
        error: null
    }

    const endState = appReducer(startState, setAppStatusAC('loading'))
    expect(endState.status).toBe('loading')
})