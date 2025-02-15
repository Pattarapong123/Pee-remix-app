import Mymenu from "./templates/Mymenu";
import Myfooter from "./templates/Myfooter";
import { useState } from "react";

function MyContact (){
    return(
        <div className="m-0">
            <Mymenu />
            <h1 className="text-xl">ติดต่อฉัน</h1>
            <div className="flex flex-row justify-center">
                ชื่อ:ภัทรพงศ์ แตงงาม<br/>
                Name:Pattarapong Tangngam<br/>
                รหัสนักศึกษา:026640491611-3 <br />
                ชื่อเล่น:พี
                ระดับการศึกษา:ปี4 <br />
                สาขา:เทคโนโลยีสารสนเทศ <br />
                </div>
                <Myfooter />
            </div>
            
            
    );
}

export default MyContact;