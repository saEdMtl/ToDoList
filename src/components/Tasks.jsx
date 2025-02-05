import React, { useContext, useState } from 'react';
import { tasksContext } from './HomePage';
import IncompletedTasks from './IncompletedTasks';
import DoneTasks from './DoneTasks';
import AllTasks from './AllTasks';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'animate.css';
import "./tasks.css"
import { useEffect } from 'react';

function Tasks() {

    const tasks = useContext(tasksContext);
    const [checkedTasks, setcheckedTasks] = useState([]);
    const [doneDelete, setDoneDelete] = useState(false);

    const doneTask = index => {
        const completedTasks = [...tasks.tasks];
        completedTasks[index].status = 1;
        tasks.setTasks(completedTasks);
    }

    const deleteHandler = index => {
        const firstUpdatedTasks = tasks.tasks.filter((Element, i) => i !== index);
        tasks.setTasks(firstUpdatedTasks);
    }

    const moveUp = index => {
        if (index > 0) {
            const secondupdatedTasks = [...tasks.tasks];
            [secondupdatedTasks[index], secondupdatedTasks[index - 1]] =
                [secondupdatedTasks[index - 1], secondupdatedTasks[index]]
            tasks.setTasks(secondupdatedTasks);
        }
    }

    const moveDown = index => {
        if (index < tasks.tasks.length - 1) {
            const secondupdatedTasks = [...tasks.tasks];
            [secondupdatedTasks[index], secondupdatedTasks[index + 1]] =
                [secondupdatedTasks[index + 1], secondupdatedTasks[index]]
            tasks.setTasks(secondupdatedTasks);
        }
        setDoneDelete(true)
    }

    const edit = (i, newName) => {

        const thirdUpdatedTasks = tasks.tasks.map((task, index) => {
            if (task.name = i) {
                task.name = newName;
            } else { return task; }

            tasks.setTasks(thirdUpdatedTasks);
        })
    }

    const clickHandler = (t, isChecked) => {
        if (!isChecked) {
            setcheckedTasks(prev => [...prev, t]);
        }
        else {
            setcheckedTasks(prev => prev.filter(id => id !== t));
        }
    }

    const doneTask2 = () => {
        tasks.setTasks(prevTasks =>
            prevTasks.map(task =>
                checkedTasks.includes(task.id) ? { ...task, status: 1 } : task
            )
        );

        setcheckedTasks([]);
    };

    const deleteHandler2 = () => {
        if (!tasks || !tasks.tasks) return;

        tasks.setTasks(prevTasks =>
            prevTasks.filter(task => !checkedTasks.includes(task.id))
        );

        setcheckedTasks([]);
    }

    return (
        <div>

            <Tabs className="md:mt-16 mt-10">
                <TabList>
                    <Tab onClick={() => setcheckedTasks([])}>Tasks To Be Performed</Tab>
                    <Tab onClick={() => setcheckedTasks([])}>Tasks that have been completed</Tab>
                    <Tab onClick={() => setcheckedTasks([])}>All of the tasks</Tab>
                </TabList>

                <TabPanel className="mt-10">
                    {tasks.tasks.map((t, index) =>
                        <IncompletedTasks
                            t={t}
                            index={index}
                            key={index}
                            doneTask={doneTask}
                            deleteHandler={deleteHandler}
                            moveDown={moveDown}
                            moveUp={moveUp}
                            edit={edit}
                            clickHandler={clickHandler} />
                    )}

                </TabPanel>
                <TabPanel className="mt-10">
                    {tasks.tasks.map((t, index) => <DoneTasks
                        t={t}
                        index={index}
                        key={index}
                        doneTask={doneTask}
                        deleteHandler={deleteHandler}
                        moveDown={moveDown}
                        moveUp={moveUp}
                        edit={edit}
                        clickHandler={clickHandler}
                    />)}
                </TabPanel>
                <TabPanel className="mt-10">
                    {tasks.tasks.map((t, index) => <AllTasks
                        t={t}
                        index={index}
                        key={index}
                        doneTask={doneTask}
                        deleteHandler={deleteHandler}
                        moveDown={moveDown}
                        moveUp={moveUp}
                        edit={edit} clickHandler={clickHandler}
                    />)}
                </TabPanel>
            </Tabs>
            {
                checkedTasks.length ? (<div>
                    <button onClick={doneTask2} className='bg-amber-100 rounded-xl md:p-2 mr-1.5 md:text-md p-1 text-sm'>Done!!</button>
                    <button onClick={deleteHandler2} className='bg-amber-100 rounded-xl md:p-2 mr-1.5 md:text-md p-1 text-sm'>Delete</button>
                </div>)
                    : ""
            }
        </div>
    )
}

export default Tasks