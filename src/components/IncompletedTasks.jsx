import React, { useState, useEffect } from 'react'

function IncompletedTasks({ t, index, doneTask, deleteHandler, moveDown, moveUp, edit, clickHandler }) {

    const [editTask, setEditTask] = useState(false);
    const [newName, setNewName] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [subsetOne, setSubsetOne] = useState(false);
    const [subsetTwo, setSubsetTwo] = useState(false);
    const [subsetThree, setSubsetThree] = useState(false);

    const classNames = {
        buttons: 'bg-amber-100 rounded-xl md:p-2 mr-1.5 md:text-md p-1 text-[12px] sm:text-sm hover:cursor-pointer'
    }

    const ChangeHandler = e => {
        setNewName(e.target.value)
    }

    const checkHandler = () => {
        setIsChecked(!isChecked);
    }

    const doneSubsetOne = () => {
        setSubsetOne(perv => !perv);
    }

    const doneSubsetTwo = () => {
        setSubsetTwo(perv => !perv);
    }

    const doneSubsetThree = () => {
        setSubsetThree(perv => !perv);
    }

    useEffect(() => {
        if (t.subset1 && t.subset2 && t.subset3) {
            if (subsetOne && subsetTwo && subsetThree) {
                doneTask(index)
            }
        } else if (t.subset1 && t.subset2) {
            if (subsetOne && subsetTwo) {
                doneTask(index)
            }
        }
        else if (t.subset1 && t.subset3) {
            if (subsetOne && subsetThree) {
                doneTask(index)
            }
        } else if (t.subset3 && t.subset2) {
            if (subsetThree && subsetTwo) {
                doneTask(index)
            }
        }else if (t.subset1) {
            if (subsetOne) {
                doneTask(index)
            }
        }else if (t.subset2) {
            if (subsetTwo) {
                doneTask(index)
            }
        }else if (t.subset3) {
            if (subsetThree) {
                doneTask(index)
            }
        }

    }, [subsetOne, subsetTwo, subsetThree])

    return (
        <div>
            {
                editTask
                    ? (<div className='my-10 flex items-center'>
                        <input type='text' className='text-left border-1 md:p-3 p-1 rounded-xl md:w-100 w-70' value={newName} onChange={ChangeHandler} placeholder={`${t.name}`} />
                        <div onClick={() => setEditTask(false)}><button className='md:text-3xl text-2xl' onClick={() => edit(t.name, newName)}>✅</button></div>
                        <button onClick={() => setEditTask(false)} className='md:text-3xl text-2xl'>❌</button>
                    </div>)
                    : (<div>{t.status ? "" : <div className='animate__animated animate__lightSpeedInLeft'>
                        <div className="border-1 md:p-4 p-2 rounded-xl mt-2">
                            <input type='checkbox' checked={isChecked} onChange={checkHandler} onClick={() => clickHandler(t.id, isChecked)} />
                            <h6 className='sm:mb-3 mb-1 sm:text-lg text-sm font-bold'>{t.name}</h6>
                            <div className='flex sm:mb-5 mb-2'>
                                {t.subset1
                                    ? <div className=' border-1 rounded-md p-1 flex hover:bg-amber-200 hover:cursor-pointer' onClick={doneSubsetOne}>
                                        <p className={`${subsetOne && "line-through"} text-sm sm:text-md`}>{t.subset1}</p>
                                    </div>
                                    : ""
                                }
                                {t.subset2
                                    ? <div className={`border-1 rounded-md p-1 flex ${t.subset1 ? 'ml-5' : ''} hover:bg-amber-200 hover:cursor-pointer`} onClick={doneSubsetTwo}>
                                        <p className={`${subsetTwo && "line-through"} text-sm sm:text-md`}>{t.subset2}</p>
                                    </div>
                                    : ""}
                                {t.subset3
                                    ? <div className={`border-1 rounded-md p-1 flex ${t.subset2 || t.subset1 ? 'ml-5' : ''} hover:bg-amber-200 hover:cursor-pointer`} onClick={doneSubsetThree}>
                                        <p className={`${subsetThree && "line-through"} text-sm sm:text-md`}>{t.subset3}</p>
                                    </div>
                                    : ""}

                            </div>
                            <button onClick={() => doneTask(index)} className={`${classNames.buttons}`}>Done!!</button>
                            <button onClick={() => deleteHandler(index)} className={`${classNames.buttons}`}>Delete</button>
                            <button onClick={() => moveUp(index)} className={`${classNames.buttons}`}>Move Up</button>
                            <button onClick={() => moveDown(index)} className={`${classNames.buttons}`}>Move Down</button>
                            <button onClick={() => setEditTask(true)} className={`${classNames.buttons}`}>Edit</button>
                        </div>
                    </div>}
                    </div>)
            }
        </div>
    )
}

export default IncompletedTasks;


