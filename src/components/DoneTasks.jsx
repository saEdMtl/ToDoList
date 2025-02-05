import React, { useState } from 'react'

function DoneTasks({ t, index, doneTask, deleteHandler, moveDown, moveUp, edit, clickHandler }) {

    const [editTask, setEditTask] = useState(false);
    const [newName, setNewName] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const classNames = {
        buttons: 'bg-amber-100 rounded-xl md:p-2 mr-1.5 md:text-md p-1 text-[12px] sm:text-sm hover:cursor-pointer'
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
                        <div className='animate__animated animate__lightSpeedInLeft border-1 md:p-4 p-2 rounded-xl mt-2'>
                            <input type='checkbox' checked={isChecked} onChange={checkHandler} onClick={() => clickHandler(t.id, isChecked)} />
                            <h6 className='sm:mb-3 mb-1 sm:text-lg text-sm font-bold line-through'>{t.name}</h6>
                            <div className='flex sm:mb-5 mb-2'>
                                {t.subset1
                                    ? <div className=' border-1 rounded-md p-1 flex '>
                                    <p className={`line-through text-sm sm:text-md`}>{t.subset1}</p>
                                </div>
                                : ""
                            }
                            {t.subset2
                                ? <div className={`border-1 rounded-md p-1 flex ${t.subset1 ? 'ml-5' : ''} `} >
                                    <p className={`line-through text-sm sm:text-md`}>{t.subset2}</p>
                                </div>
                                : ""}
                            {t.subset3
                                ? <div className={`border-1 rounded-md p-1 flex ${t.subset2 || t.subset1 ? 'ml-5' : ''} `}>
                                    <p className={`line-through text-sm sm:text-md`}>{t.subset3}</p>
                                </div>
                                    : ""}

                            </div>
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

