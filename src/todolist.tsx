type Tasktype = {
    title: string
    id: string
    isDone: boolean
}
type propsTypeTodolist = {
    title: string
    todoId: string
    task: Array<Tasktype>
}

export const Todolist = (props: propsTypeTodolist) => {
    const {
        title,
        todoId,
        task
    } = props

    return (
        <div className={'Todolist'}>
            <h3>{title}</h3>
            <input/>
            <button>+</button>

            {task.map((item) => {
                return (
                    <li>
                        <input
                            type={"checkbox"}
                            checked={item.isDone}
                        />
                        <span>{item.title}</span>
                        <button>X</button>
                    </li>
                )
            })}

        </div>
    )
}