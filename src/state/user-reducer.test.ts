import {userReducer} from './​user-reducer'

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    // your code here
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});
    expect(endState.childrenCount).toBe(3)
})

test('user should change of user', () => {

   const startState = {age: 21, name: 'Dasha', childrenCount: 2};
   const end = userReducer(startState, {type: 'new-name'})

    expect(end.name).toBe('Masha')
    }
)


test('repeat', ()=> {
    const obj = {name: 'Masha', age: 21, childrenCount: 1}
    const  newObj = userReducer(obj, {type: 'repeat'});

    expect(newObj.age).toBe(23)
})
