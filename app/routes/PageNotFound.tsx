import Mymenu from "./templates/mymenu";
import Myfooter from "./templates/myfooter";
import { useState } from "react";

function PageNotFound (){
    return(
        <div className="m-0">
            <Mymenu />
            <h1 className="text-xl">ติดต่อฉัน</h1>
            <div className="flex flex-row justify-center">
               ไม่พบข้อมูลที่คุณเลือก กรุณาตรวจสอบอีกครั้ง<br/>
               <a href ="/"></a>
                </div>
                <Myfooter />
            </div>
            
            
    );
}

export default PageNotFound;