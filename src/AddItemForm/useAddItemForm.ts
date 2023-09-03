import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (addItem: (title: string)=> void) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addNewItem = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addNewItem();
        }
    }
    return {
        title,
        error,
        addNewItem,
        onChangeHandler,
        onKeyPressHandler
    } as const
}
