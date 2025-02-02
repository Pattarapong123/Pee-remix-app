import { toDoItems } from "./toDoList";
import Mymenu from "./templates/Mymenu";
import Myfooter from "./templates/Myfooter";


function CompletedCheck({ c }: { c: boolean }) {
  if (c) return <span>🤢🤢</span>;
  return <span>🥶🥶</span>;
}

import { useState } from "react";
export default function toDolist() {
    const [cpStatus, setStatus] = useState(null);
    
    const cpToDoItems = toDoItems.filter(cpToDo =>{
        if(cpStatus === null) return true;
        return cpToDo.completed === cpStatus;
});

    const handleComplete = ( st:any) => {
        setStatus(st);

    }

    const ListItems = cpToDoItems.map((item, index) =>
    <div className="m-3" key={index}>
    <a href={`/getDetail/${item.id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        {/* แสดงภาพปก */}
        <img 
          src={item.coverImage} 
          alt={item.title} 
          className="w-full h-56 object-cover mb-4 rounded-md" 
        />
        <b className="text-base">
        <CompletedCheck c={item.completed}/></b>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title+"(รหัส:"+item.id+")"}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{item.created}</p>
    </a>  
    </div>
    );
return (
    <div className="m-0">
    <Mymenu />
    <h1 className="text-xl">สิ่งที่ต้องทำ ...</h1>
    {ListItems}
    
    <Myfooter />
    </div>
    );
}