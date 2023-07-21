import { userReducer } from './​user-reducer'

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    // your code here
    const endState = {age : 21, childrenCount: 0, name: "Masha"}
    expect(endState.name).toBe('Masha');
    expect(endState.childrenCount).toBe(0)
expect(endState.age).toBe(21)
    })
