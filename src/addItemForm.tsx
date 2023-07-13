import {ChangeEvent, useState} from "react";
import {Button} from "@mui/material";

type propsAddItemType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: propsAddItemType) => {
    let [titleInput, setTitleInput] = useState('');
    let [error, setError] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
        setError('')
    }
    const onClickHadler = () => {
        props.addItem(titleInput)
        setTitleInput('');
        if (titleInput === '') {
            setError(' ')
        }
    }

    return (
        <div>
            <input value={titleInput} onChange={onChangeHandler}/>
            <Button variant={'contained'} color={'primary'} onClick={onClickHadler}>+</Button>
            {error ? <div className={'error'}>Error</div> : ''}
        </div>
    )
}