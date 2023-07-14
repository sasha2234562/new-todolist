import {ChangeEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

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
        if(titleInput !== ''){
            props.addItem(titleInput)
        }
        setTitleInput('');
        if (titleInput === '') {
            setError('title is required')
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={titleInput}
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
            />
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={onClickHadler}>
                +
            </Button>
        </div>
    )
}