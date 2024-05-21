'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import Item from "@/components/item";

export type Tasks = {
    id: number;
    name: string;
    isEditing: boolean;
}
export default function Home() {
    
    let localStorageTasks = '[]'
    
    if(typeof localStorage !== 'undefined'){
        localStorageTasks = localStorage.getItem('tasks') ?? '[]'
        console.log(localStorage, "localStorage")
    }
    const [searchTask, setSearchTask] = useState<string>("");
    const [listOfTask, setListOfTask] = useState<Tasks[]>(JSON.parse(localStorageTasks) ?? []);
    const [newTask, setNewTask] = useState<string>("");
    const [updateTask, setUpdateTask] = useState<string>("");

    useEffect(() => {
        if (searchTask === "") {
            setListOfTask(JSON.parse(localStorageTasks) ?? [])
        } else {
            SearchTask()
        }
    }, [searchTask])

    const SearchTask = (): void => {
        let mappedData: Tasks[] = [];
        let storedData: Tasks[] = JSON.parse(localStorageTasks) ?? [];
        storedData.filter(task => task.name.toUpperCase()
            .includes(searchTask.toUpperCase()))
            .map((filtered, index) => mappedData.push(filtered))
        setListOfTask(mappedData)
    }
    const AddTask = (): void => {
        let pattern = /^\w+$/;
        let isValid = pattern.test(newTask);
        if (isValid) {
            setListOfTask(prevState => ([...listOfTask, { id: Math.random(), name: newTask, isEditing: false }]))
            localStorage.setItem("tasks", JSON.stringify([...listOfTask, { id: Math.random(), name: newTask, isEditing: false }]));
            setNewTask("")
        }else{
            alert("Please enter valid value")
        }
    }

    const RemoveTask = (id: number): void => {
        setListOfTask(listOfTask.filter(task => task.id !== id))
        localStorage.setItem("tasks", JSON.stringify(listOfTask.filter(task => task.id !== id)));
    }
    const UpdateTask = (id: number): void => {
        let pattern = /^\w+$/;
        let isValid = pattern.test(updateTask);
        if (isValid) {
            let updateList = [...listOfTask]
            let item: any = updateList.find(task => task.id === id)
            item.name = updateTask
            item.isEditing = false
            setListOfTask(updateList)
            localStorage.setItem("tasks", JSON.stringify(updateList));
        }else{
            alert("Please enter valid value")
        }
    }
    const EditTask = (id: number): void => {
        let updateList = [...listOfTask]
        let checkIsEditing = listOfTask.find(task => task.isEditing === true)
        let item: any = updateList.find(task => task.id === id)
        setUpdateTask(item.name)
        item.isEditing = true
        if (!checkIsEditing) {
            setListOfTask(updateList)
        } else {
            let closeItem: any = updateList.find(task => task.id === checkIsEditing?.id)
            closeItem.isEditing = false
            setListOfTask(updateList)
        }

    }


    return (
        <div className="flex flex-col items-center bg-green-100 p-16 min-h-screen">
            <p className="p-5 text-5xl">Task Tracker</p>
            <div className="lg:flex lg:justify-evenly lg:gap-y-4 lg:w-3/4">
                <div className="flex flex-col gap-y-4 mb-4">
                    <input className="block border-0 py-1.5 pr-20 pl-7 rounded-md text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600" type="text" placeholder="new task" onChange={(e) => setNewTask(e.target.value)} value={newTask} />
                    <button className="bg-emerald-500 hover:bg-green-500 focus:bg-green-500 active:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 p-2 rounded-2xl w-full" onClick={AddTask}>Create</button>
                </div>
                <div className="flex flex-col gap-y-4 mb-4">
                    <input className="block border-0 py-1.5 pr-20 pl-7 rounded-md text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600" type="text" value={searchTask} onChange={(e) => setSearchTask(e.target.value)} placeholder="search" />
                    <button className="bg-emerald-500 hover:bg-green-500 focus:bg-green-500 active:bg-green-600 focus:outline-none focus:ring focus:ring-green-700 p-2 rounded-2xl w-full" onClick={SearchTask}>Search</button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 w-full">
                {
                    listOfTask.map((task, i) => {
                        return <Item key={i} task={task} updateTask={updateTask} setUpdateTask={setUpdateTask} UpdateTask={UpdateTask} EditTask={EditTask} RemoveTask={RemoveTask} />
                    })
                }
            </div>
        </div>
    );
}
