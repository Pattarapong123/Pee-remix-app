import Mymenu from "./templates/Mymenu";
import { useParams } from "@remix-run/react";
import Myfooter from "./templates/Myfooter";
import { useState, useEffect } from "react";

function Orders() {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { ordid } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respData = await fetch(`http://localhost:3001/orders/${ordid}`);
                if (!respData.ok) {
                    throw new Error("Network response was not ok");
                }
                const respJson = await respData.json();
                console.log(respJson);
                setOrder(respJson);
            } catch (error) {
                alert("Error fetching data: " + error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [ordid]);

    if (isLoading) {
        return <p className="m-5 text-center text-gray-400">Loading...</p>;
    }

    if (!order) {
        return <p className="m-5 text-center text-red-400">Order not found.</p>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Mymenu />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-teal-400 mb-6 text-center">รายละเอียดคำสั่งซื้อ</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                        <h2 className="text-xl font-semibold text-teal-400 mb-4">ข้อมูลคำสั่งซื้อ</h2>
                        <p><span className="font-semibold">รหัสคำสั่งซื้อ:</span> {order.orderId}</p>
                        <p><span className="font-semibold">วันที่สั่งซื้อ:</span> {order.orderDate}</p>
                        <p><span className="font-semibold">ราคารวม:</span> {order.orderTotal} บาท</p>
                        <p><span className="font-semibold">สถานะ:</span> {order.orderStatus}</p>
                        <p><span className="font-semibold">ผู้สั่งซื้อ:</span> {order.orderBy}</p>
                    </div>
                    
                    
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600">
                        <h2 className="text-xl font-semibold text-teal-400 mb-4">สถานะการจัดส่ง</h2>
                        <p><span className="font-semibold">สถานะการส่ง:</span> {order.status}</p>
                        <p><span className="font-semibold">เลขพัสดุ:</span> {order.trackingNumber}</p>
                        <p><span className="font-semibold">ขนส่ง:</span> {order.courier}</p>
                        <p><span className="font-semibold">จัดส่งประมาณ:</span> {order.estimatedDelivery}</p>
                        <p><span className="font-semibold">จัดส่งสำเร็จ:</span> {order.Deliverysuccessful}</p>
                    </div>
                </div>
                
                
                <div className="mt-6 flex justify-center">
                    <a href="/orders" className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition">
                        ย้อนกลับ
                    </a>
                </div>
            </div>
            <Myfooter />
        </div>
    );
}

export default Orders;
