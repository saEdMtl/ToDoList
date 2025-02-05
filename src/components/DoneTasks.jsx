import React, { useState } from 'react'

function DoneTasks({ t, index, doneTask, deleteHandler, moveDown, moveUp, edit,clickHandler }) {

    const [editTask, setEditTask] = useState(false);
    const [newName, setNewName] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const classNames = {
        buttons: 'bg-amber-100 rounded-xl md:p-2 mr-1.5 md:text-md p-1 text-sm'
    }

    const ChangeHandler = e => {
        setNewName(e.target.value)
    }

    const checkHandler = () => {
        setIsChecked(!isChecked);
    }

    const cancel = () => {
        setEditTask(false);
        setNewName("");
    }

    return (
        <div>
            {
                editTask
                    ? (<div className='my-10 flex items-center'>
                        <input type='text' className='text-left border-1 md:p-3 p-1 rounded-xl md:w-100 w-70' value={newName} onChange={ChangeHandler} placeholder={`${t.name}`} />
                        <div onClick={() => setEditTask(false)}><button className='md:text-3xl text-2xl' onClick={() => edit(t.name, newName)}>✅</button></div>
                        <button onClick={cancel} className='md:text-3xl text-2xl'>❌</button>
                    </div>)
                    : (<div>{t.status ?
                        <div className='animate__animated animate__lightSpeedInLeft border-1 p-4 rounded-xl mt-2'>
                            <input type='checkbox' checked={isChecked} onChange={checkHandler} onClick={() => clickHandler(t.id, isChecked)} />
                            <h6 className='mb-3 text-lg font-bold'>{t.name}</h6>
                            <button onClick={() => doneTask(index)} className={`${classNames.buttons}`}>Done!!</button>
                            <button onClick={() => deleteHandler(index)} className={`${classNames.buttons}`}>Delete</button>
                            <button onClick={() => moveUp(index)} className={`${classNames.buttons}`}>Move Up</button>
                            <button onClick={() => moveDown(index)} className={`${classNames.buttons}`}>Move Down</button>
                            <button onClick={() => setEditTask(true)} className={`${classNames.buttons}`} >Edit</button>
                        </div> : ""}
                    </div>)
            }
        </div>
    )
}

export default DoneTasks

