import express from 'express';
import cors from 'cors';
const app = express()
const port = 3001

app.use(cors());
 //Object array
const myOrder = [
{
  "orderId":"ORD001",
  "orderDate":"31/01/2025 12:00:00",//newDate
  "orderTotal":1890,
  "orderStatus":10,
  "orderBy":"Pattarapong Tangngam",
  "status": "จัดส่งแล้ว",
  "trackingNumber": "TH123456789",
  "courier": "DHL",
  "estimatedDelivery": "02/02/2025"
},
{
  "orderId":"ORD002",
  "orderDate":"31/01/2025 12:20:00",//newDate
  "orderTotal":2000,
  "orderStatus":20,
  "orderBy":"Kisana Nor",
  "status": "กำลังแพ็ค",
},
{
  "orderId":"ORD003",
  "orderDate":"31/01/2025 13:30:00",//newDate
  "orderTotal":3000,
  "orderStatus":30,
  "orderBy":"Panpoom Por",
  "status": "จัดส่งสำเร็จ",
  "trackingNumber": "TH789456123",
  "courier": "DHL",
  "estimatedDelivery": "03/02/2025",
  "Deliverysuccessful":"05/02/2025"
},
];

//http://localhost:3001/orders/ORD003
app.get('/orders/:ordid', (req, res)=>{
  let orderId = req.params.ordid;
  const result = myOrder.filter(
    (objOrd, index) => {
      return objOrd.orderId == orderId
    }
  )
  res.send(result[0]); //result[0].xxx --{},result[0].xxx --[{}]
})

//http://localhost:3001/orders
app.get('/orders',(req, res)=>{
  res.send(myOrder);
})

// GET, POST, PUT, DELETE
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//http://localhost:3001/toDoLists/u200/ord100
app.get('/toDoLists/:userId/:orderId', (req, res) => {
    let myData = "<h1>My Profile</h1>";
    myData+="<strong>User ID:</strong>"+req.params.userId+"</br>";
    myData+="<strong>Order ID:</strong>"+req.params.orderId+"</br>";
    res.set('Content-type', 'text/html');
    res.send(myData);
  })
 
app.post('/', (req, res) => {
  res.send('Hello World in POST method!')
})
 
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})