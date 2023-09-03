import {AddItemForm} from "../AddItemForm/AddItemForm";
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItemForm',
    component: AddItemForm
}
const callBack = action('Button add')
export const AddItemFormBaceExample = (props: any)=> {
    return <AddItemForm addItem={callBack}/>
}
