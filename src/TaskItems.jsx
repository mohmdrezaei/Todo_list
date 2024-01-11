import React, {useContext, useState} from "react";
import {taskContext} from "./taskContext";


const TaskItems = () => {
    const [editedTask, setEditedTask] = useState("");
    const [editingId, setEditingId] = useState(null);
    const handleSetTaskItems = (id) => {

        const index = taskItems.findIndex(t => t.id === id)
        let newTaskItems = [...taskItems];
        newTaskItems[index].done = !newTaskItems[index].done;
        setTaskItems(newTaskItems)
    }
    const handleDeleteTask = (id) => {
        let newTask = taskItems.filter(t => t.id !== id)
        setTaskItems(newTask)
    }
    const handleEditTask = (id) => {
        setEditingId(id)
        let editedTaskText = taskItems.find(t => t.id === id).title
        setEditedTask(editedTaskText)
    }
    const handleSaveEdit = () => {
        const index = taskItems.findIndex(t => t.id === editingId)
        let newTaskItems = [...taskItems];
        newTaskItems[index].title = editedTask;
        setTaskItems(newTaskItems);
        setEditingId(null);
        setEditedTask("");
    }
    const {taskItems, setTaskItems} = useContext(taskContext)
    if (taskItems.length) {
        return (
            <ul className="list-group m-0 p-0 mt-2">
                {
                    taskItems.map(t => (
                        <li className={
                            `list-group-item d-flex justify-content-between align-items-center
                        ${t.done ? "list-group-item-success" : ""}`}>
                            {editingId === t.id ?
                                <input type="text"
                                       value={editedTask}
                                       onChange={(e) => setEditedTask(e.target.value)}
                                />
                                :
                                t.title
                            }
                            <span>

                                {editingId === t.id ?
                                    <>
                                    <i className="me-3 pointer fas fa-check text-success
                                       transition_200 text_hover_shadow"
                                       onClick={()=>handleSaveEdit()}
                                    ></i>
                                        <i className="me-3 pointer fas fa-times text-danger
                                       transition_200 text_hover_shadow"
                                           onClick={()=>{
                                               setEditingId(null);
                                               setEditedTask("")
                                           }}
                                        ></i>
                                    </>
                                    :
                                    <>
                                    <i className={
                                    `me-3 pointer fas fa-check text-success 
                                    transition_200 text_hover_shadow
                                   ${t.done ? "fa-check" : "fa-times text-warning"} `}
                                onClick={() => handleSetTaskItems(t.id)}
                            ></i>
                            <i className="me-3 pointer fas fa-edit text-info
                               transition_200 text_hover_shadow"
                               onClick={() => handleEditTask(t.id)}
                            ></i>

                            <i className="me-3 pointer fas fa-trash text-danger
                               transition_200 text_hover_shadow"
                               onClick={() => handleDeleteTask(t.id)}
                            ></i>
                        </>

                }
            </span>
    </li>
    ))
    }


    </ul>
    )
    } else {
        return (
            <h5 className="text-danger text-center mt-4">موردی ثبت نشده ...</h5>
        )
    }

}
export default TaskItems;