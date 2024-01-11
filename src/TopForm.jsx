import React, {useContext, useState} from "react";
import {taskContext} from "./taskContext";

const TopForm = () => {
    const {taskItems ,setTaskItems} = useContext(taskContext)
    const [task , setTask] =useState()
    const handleSetTask = (event) => {
      setTask(event.target.value)
    }
    
    const handleAddTask = (e) => {
        e.preventDefault();
      setTaskItems([... taskItems , {id:Math.random() ,title:task , done:false}])
        setTask("")
    }
  return(
      <>
          <h4 className="text-center text-info text-shadow"> لیست کار ها</h4>
          <form onSubmit={handleAddTask}>
              <div className="form-group d-flex">
                  <input type="text" className="form-control" value={task} required
                     onChange={handleSetTask}    placeholder="لطفا نام کار را وارد کنید"/>
                  <button className="btn btn-success">افزودن</button>
              </div>
          </form>
      </>
  )
}
export default TopForm;