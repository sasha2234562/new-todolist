import {ChangeEvent, useState} from "react";


type propsTypeEditableSpan = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: propsTypeEditableSpan) => {
    let [titleInput, setTitleInput]= useState('');

    let [editMode, setEditMode] = useState<boolean>(true)
    const {
        title,
        onChange
    } = props

    const onDoubleClickHandler = () => {
        setEditMode(false)
    }
    const onblurHandler = () => {
        setEditMode(true)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }
    return (<>
            {editMode ?
                <span onDoubleClick={onDoubleClickHandler}>{title}</span> :
                <input type="text" value={title} onBlur={onblurHandler} autoFocus onChange={onChangeHandler}/>}
        </>
    )
}