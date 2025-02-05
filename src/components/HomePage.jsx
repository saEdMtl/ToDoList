import React, { createContext, useState } from 'react'
import Header from './Header';
import Tasks from './Tasks';
import { v4 as uuidv4 } from 'uuid';


export const tasksContext = createContext();

function HomePage() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        name: '',
        id: uuidv4(),
        status: 0,
        subset1: '',
        subset2: '',
        subset3: '',
        checkedSubsets: 0
    });

    const add = () => {
        setTasks([...tasks, newTask]);
        setNewTask({
            name: '',
            id: uuidv4(),
            status: 0,
            subset1: '',
            subset2: '',
            subset3: '',
            checkedSubsets: 0

        });
    }

    const inputChangeHandler = event => {
        setNewTask({ ...newTask, name: event.target.value });
    }

    const subset1ChangeHandler = (event) => {
        setNewTask({ ...newTask, subset1: event.target.value });
    }

    const subset2ChangeHandler = (event) => {
        setNewTask({ ...newTask, subset2: event.target.value });
    }

    const subset3ChangeHandler = (event) => {
        setNewTask({ ...newTask, subset3: event.target.value });
    }

    return (
        <div>
            <Header />
            <div className='flex justify-center flex-col '>
                <h4 className='text-xl font-bold mx-auto mt-8 md:text-3xl'> Add Your Tasks </h4>
                <div className='mx-auto mt-4'>
                    <input placeholder='Name of Task' value={newTask.name} onChange={inputChangeHandler} className='md:w-xs md:p-3 md:text-lg mr-2 border-solid outline rounded-xl p-2 text-md ' />
                    <button onClick={add} className='outline rounded-lg md:p-3 p-2 text-md hover:bg-amber-100 transition-normal'>Add</button>
                </div>
                <div>
                    <h6 className='mt-5 text-center text-lg md:text-2xl mb-3'>You Can Also Add Subset For Your Tasks</h6>
                    <div className='flex justify-center'>
                        <input placeholder='Subset One' value={newTask.subset1} onChange={subset1ChangeHandler} className='md:w-xs w-30 p-2 text-sm md:p-3 md:text-lg mr-2 border-solid outline rounded-xl p-2 text-md ' />
                        <input placeholder='Subset Two' value={newTask.subset2} onChange={subset2ChangeHandler} className='md:w-xs w-30 p-2 text-sm md:p-3 md:text-lg mr-2 border-solid outline rounded-xl p-2 text-md ' />
                        <input placeholder='Subset Three' value={newTask.subset3} onChange={subset3ChangeHandler} className='md:w-xs w-30 p-2 text-sm md:p-3 md:text-lg mr-2 border-solid outline rounded-xl p-2 text-md ' />
                    </div>
                </div>
                <div>
                    <tasksContext.Provider value={{ tasks, setTasks }}>
                        <Tasks />
                    </tasksContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default HomePage;