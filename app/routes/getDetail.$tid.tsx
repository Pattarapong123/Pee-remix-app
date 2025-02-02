import { useParams,useNavigate } from "@remix-run/react";
import Mymenu from "./templates/Mymenu";
import Myfooter from "./templates/Myfooter";
import { toDoItems } from "./toDoList";


function GetDetaol() {
    const myParams = useParams();
    
    const toDoId = myParams.tid; // ใช้ชื่อที่ตรงกับที่กำหนดในเส้นทาง (route)
    const navigate = useNavigate();

    const tdItem = toDoItems.filter((item) =>
        item.id == Number (toDoId)
    
);
    console.log(tdItem);

    const handleNotFound = () =>{
        navigate('/PageNotFound')
    }
   // if(tdItem.length ===0){
  //      handleNotFound();
  //  }
    return (
        <div className="m-0">
            <Mymenu />
            <h1 className="text-xl">รายละเอียด</h1>
            <div className="flex flex-row justify-center">
                {
                    tdItem.length === 0 ?  
                    (
                        <a onClick={handleNotFound}>[คลิกที่นี้]</a>
                    )
                    :
                (
                    <>
        <img 
             src={tdItem[0].coverImage} 
             alt="ภาพประกอบ" 
             style={{ maxWidth: "300px", height: "auto" }} 
        />
        <br /><br />
             รหัสข้อมูล: {tdItem[0].id}
        <br /><br />
             หัวข้อ: {tdItem[0].title}
        <br /><br />
            วันที่สร้าง: {tdItem[0].created}
        <br /><br />
             สถานะ: {tdItem[0].completed ? "เสร็จสิ้น" : "ยังไม่เสร็จสิ้น"}
        <br /><br />
</>

                
                )
            }
            </div>
            <p>
    <a 
        href="/getToDoLists" 
        className="bg-green-300 m-2 p-2 inline-block text-center"
    >
        ย้อนกลับ
    </a>
</p>

            <Myfooter />
        </div>
    );
}

export default GetDetaol;
