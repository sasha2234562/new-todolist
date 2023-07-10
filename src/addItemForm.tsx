import {ChangeEvent, useState} from "react";

type propsAddItemType= {
    addItem: (title: string)=>void
}
export const AddItemForm= (props: propsAddItemType)=> {
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

    return(
        <div>
            <input value={titleInput} onChange={onChangeHandler}/>
            <button onClick={onClickHadler}>+</button>
            {error ? <div className={'error'}>Error</div> : ''}
        </div>
    )
}