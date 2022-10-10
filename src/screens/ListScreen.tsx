import React, {ChangeEvent, useState} from 'react'
import {Task, TasksProps} from "../types";

type Props = TasksProps

const ListScreen: React.FC<Props> = ({addTask, tasks, setTasks, updateTaskCompletion}) =>{
    const [newTaskLabel, setNewTaskLabel] = useState('')

    const handleChangeNewLabel = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value)

    // @ts-ignore
    const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTaskLabel !== '') {
            addTask({label: newTaskLabel})
            setNewTaskLabel('')
        }
    }

    const handleCompleteChange = (handleTask: Task) => (e: ChangeEvent<HTMLInputElement>) =>{
        updateTaskCompletion(handleTask.id, e.target.checked,)
    }

    const handleClearClick = () =>
        setTasks(tasks => tasks.filter(task => !task.isComplete))

    const handleTaskDelete = (handleTask: Task) =>  () => {
            setTasks(tasks => tasks.filter(i => i.id !== handleTask.id))
    }

    return(
        <div>
            <div>
                {tasks.map(task => (
                    <div key={task.id}>
                        <input type="checkbox" checked={task.isComplete} onChange={handleCompleteChange(task)}/>
                        {task.label}
                        <button onClick={handleTaskDelete(task)}>delete</button>
                    </div>
                    ))}
            </div>
            <input type="text" value={newTaskLabel} onChange={handleChangeNewLabel} onKeyPress={handleNewTaskKeyPress}/>
            <div><button onClick={handleClearClick}>Clear Completed</button></div>
        </div>
    )
}

export default ListScreen