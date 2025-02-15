import Mymenu from "./templates/Mymenu";
import Myfooter from "./templates/Myfooter";
import { useState, useEffect } from "react";
import Index from "./_index";

function Orders() {
    const [orders, setOrders] = useState([]);  // ✅ กำหนดค่าเริ่มต้นเป็น []
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respData = await fetch(`http://localhost:3001/orders`);
                if (!respData.ok) {
                    throw new Error("Network response was not ok");
                }
                const respJson = await respData.json();
                console.log(respJson);  // ✅ ตรวจสอบค่าที่ได้จาก API
                setOrders(respJson || []);  // ✅ กำหนดค่าเริ่มต้นเป็น []
            } catch (error) {
                alert("Error fetching data: " + error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <p className="m-5">Loading...</p>;
    }

    return (
        <div className="m-0">
            <Mymenu />
            <div className="m-5">
                <h1 className="text-xl font-bold p-2 md-5 dark:text-white border-teal-600">
                    รายการคำสั่งซื้อ
                </h1>
                <div className="flex flex-row justify-center" key={Index}>
                    {orders.map((item, index) => (
                        <div key={index} className="m-3 p-5 border border-teal-800 rounded">
                            <p>รหัสคำสั่งซื้อ: {item.orderId}</p>
                            <p>วันที่สั่งซื้อ: {item.orderDate}</p>
                            <p>สถานะ: {item.orderStatus}</p>
                            <p>สถานะการจัดส่ง:{item.status}</p>
                            <div className="mt-1 p-3 bg-teal-200 border border-teal-800 rounded text-center">
                                <a href={`/order/${item.orderId}`}>
                                    รายละเอียด
                                </a>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            <Myfooter />
        </div>
    );
}

export default Orders;
