import Mymenu from "./templates/mymenu";
import Myfooter from "./templates/myfooter";
import { useState } from "react";

function MyContact (){
    return(
        <div className="m-0">
            <Mymenu />
            <h1 className="text-xl">ติดต่อฉัน</h1>
            <div className="flex flex-row justify-center">
                ภัทรพงศ์ แตงงาม<br/>
                Pattarapong Tangngam<br/>
                </div>
                <Myfooter />
            </div>
            
            
    );
}

export default MyContact;