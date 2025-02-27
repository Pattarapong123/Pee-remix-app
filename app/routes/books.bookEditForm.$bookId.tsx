import { useState,useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";

export default function BookEditForm (){
    const myParams = useParams();
    const navigate = useNavigate();
    const bookId = myParams.bookId;
    const [bookData, setBookData] = useState({
        bookId: '',
        bookTitle: '',
        bookDesc: '',
        bookAuthor: '',
        bookCategory: '',
        bookStock: ''
});
    const [selInstock, setSelInStock] = useState('');
    const [selCate, setselCate] = useState('');

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    }

    useEffect(()=>{
        try {
            const fetchData = async () =>{
                const data = await fetch(`http://localhost:3001/api/getOneBook/${bookId}`);
                if(data.ok){
                    const json = await data.json();
                    setBookData(json);
                    setSelInStock(json.bookStock);
                    setselCate(json.bookCategory);
                }else{
                    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล...');
                }
            }
            fetchData();
        } catch (error) {
            alert('เกิดข้อผิดพลาดในระหว่างทำการดำเนินการโหลดข้อมูล...');
        }
    },[]);
 const handleSubmit = async (e) =>{
    e.preventDefault();
    if(confirm('ยืนยันการแก้ไขข้อมูล')){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        try {
            //call Service API
            const resp = await fetch('http://localhost:3001/api/updateBook',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(formJson)
                }
            );
            if(resp.ok){
                const data = await resp.json();
                alert('การ Submit ฟอร์มสำเร็จ....');
                navigate('/books/bookLists');
            }else{
                alert('การ Submitted ฟอร์มเกิดข้อผิดพลาด....');
            }
        } catch (error) {
            alert('เกิดข้อผิดพลาดขึ้นระหว่างการ Submit ฟอร์ม...');
        }
    }
}
 

    return(
        <div className="m-3">
<form method="POST" onSubmit={handleSubmit}>
<h1>แก้ไขข้อมูลหนังสือ</h1>
<input type="hidden" name="bookId" id="bookId" value={bookData.bookId} required />
<label className="m-2">ชื่อหนังสือ<span className="text-red-600">*</span></label><br />
<input type="text" name="bookTitle" id="bookTitle" value={bookData.bookTitle} onChange={handleChange} required />
<label className="m-2">รายละเอียด</label><br />
<textarea rows={3} name="bookDesc" id="bookDesc" value={bookData.bookDesc}  onChange={handleChange} />
<label className="m-2">ผู้แต่ง<span className="text-red-600">*</span></label><br />
<input type="text" name="bookAuthor" id="bookAuthor" value={bookData.bookAuthor} onChange={handleChange} required />
<label className="m-2">หมวดหมู่<span className="text-red-600">*</span></label><br />
<div className="mt-2">
<select id="bookCategory" name="bookCategory" value={bookData.bookCategory}  onChange={handleChange} required>
<option value="">-เลือกหมวดหมู่หนังสือ-</option>
<option value={10}>เทคโนโลยี</option>
<option value={20}>ปรัญชา</option>
</select>
</div>
 
        <label className="m-2">สถานะคลังสินค้า</label><br />
<div className="p-2 border border-2 rounded-md border-gray-900/10">
<div className="flex items-center gap-x-3">
<input name="bookStock" type="radio" value="In-stock" onChange={handleChange} 
                defaultChecked={selInstock === 'In-stock'} />
<label>In-stock</label>
</div>
<div className="flex items-center gap-x-3">
<input name="bookStock" type="radio" value="Out-of-stock" onChange={handleChange} 
                defaultChecked={selInstock === 'Out-of-stock'} />
<label>Out-of-stock</label>
</div>
</div>
<div className="mt-6 flex justify-center items-center">
<button type="submit">แก้ไข</button> 
<button type="reset">เคลียร์</button> 
</div>
 
 
    </form>
</div>
    );
}