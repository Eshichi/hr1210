import React from 'react'
import { Tasks } from '@/app/page'

type Props = {
    task : Tasks,
    updateTask : string,
    setUpdateTask :  React.Dispatch<React.SetStateAction<any>>,
    EditTask : any,
    RemoveTask : Function,
    UpdateTask : Function
}
export default function Item({task, updateTask, setUpdateTask , EditTask , RemoveTask , UpdateTask}:Props) {
    return (
            <div className=''>
                {
                    task.isEditing ? 
                    <div className='flex justify-between'>
                        <input className='block border-0 py-1.5 pr-28 pl-7 rounded-l-2xl text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600' type="text" value={updateTask} onChange={(e) => setUpdateTask(e.target.value)} />
                        <button className="bg-emerald-500 hover:bg-green-500 focus:bg-green-500 active:bg-green-600 p-2 rounded-r-2xl focus:outline-none focus:ring focus:ring-green-700 w-full" onClick={() => { UpdateTask(task.id) }}>save</button>
                    </div> :
                    <div className='flex justify-between items-center w-96'>
                        <p className='w-2/3 font-bold text-ellipsis whitespace-nowrap overflow-hidden'>{task.name}</p>
                        <div>
                            <button className="bg-emerald-500 hover:bg-green-500 focus:bg-green-500 active:bg-green-600 p-2 rounded-l-2xl focus:outline-none focus:ring focus:ring-green-700" onClick={() => { EditTask(task.id) }} >edit</button>
                            <button className="bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-600 p-2 rounded-r-2xl text-gray-200 focus:outline-none focus:ring focus:ring-red-700" onClick={() => { RemoveTask(task.id) }}>delete</button>
                        </div>
                    </div>
                }
            </div>
    )
}
