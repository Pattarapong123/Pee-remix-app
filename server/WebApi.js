import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import fs from 'fs';

// อ่านไฟล์ JSON แทนการใช้ assert { type: 'json' }
const serviceAccount = JSON.parse(
  fs.readFileSync('./firebase/firebase-config.json', 'utf8')
);

// ใช้ admin.initializeApp() จาก default export ของ firebase-admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const port = 3001;

app.use(cors());

// Fetch data
// http://localhost:3001/getBook
app.get('/getBook', (req, res) => {
  res.set('Content-type','application/json');
  fetchBook().then((jsonData) =>{
    res.send(jsonData);
  }).catch((error) => {
    res.send(error);
  });
});

async function fetchBook(){
  const result = [];
  const booksRef = db.collection('Books');
  const booksobj = await booksRef.get();
  booksobj.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return JSON.stringify(result, null, 2);
}

//Add book
//http://localhost:3001/addBook
app.get('/addBook', (req, res) =>{
  addBook();
  res.end('Added new book.');
});

async function addBook(){
  const newBookRef = db.collection('Books').doc();
  const bookRef = db.collection('Books').doc(newBookRef.id);
  let bookobj = {
    bookId:newBookRef.id,
    bookTitle: 'Test Title 3',
    bookDesc: 'Test Desc 3'
  };
   await bookRef.set(bookobj);
   console.log('Book added...');
}


// Object array
const myOrder = [
  {
    "orderId": "ORD001",
    "orderDate": "31/01/2025 12:00:00", // newDate
    "orderTotal": 1890,
    "orderStatus": 10,
    "orderBy": "Pattarapong Tangngam",
    "status": "จัดส่งแล้ว",
    "trackingNumber": "TH123456789",
    "courier": "DHL",
    "estimatedDelivery": "02/02/2025"
  },
  {
    "orderId": "ORD002",
    "orderDate": "31/01/2025 12:20:00", // newDate
    "orderTotal": 2000,
    "orderStatus": 20,
    "orderBy": "Kisana Nor",
    "status": "กำลังแพ็ค"
  },
  {
    "orderId": "ORD003",
    "orderDate": "31/01/2025 13:30:00", // newDate
    "orderTotal": 3000,
    "orderStatus": 30,
    "orderBy": "Panpoom Por",
    "status": "จัดส่งสำเร็จ",
    "trackingNumber": "TH789456123",
    "courier": "DHL",
    "estimatedDelivery": "03/02/2025",
    "Deliverysuccessful": "05/02/2025"
  }
];

// http://localhost:3001/orders/ORD003
app.get('/orders/:ordid', (req, res) => {
  let orderId = req.params.ordid;
  const result = myOrder.filter((objOrd) => objOrd.orderId === orderId);
  res.send(result[0] || {});
});

// http://localhost:3001/orders
app.get('/orders', (req, res) => {
  res.send(myOrder);
});

// GET, POST, PUT, DELETE
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// http://localhost:3001/toDoLists/u200/ord100
app.get('/toDoLists/:userId/:orderId', (req, res) => {
  let myData = `<h1>My Profile</h1>`;
  myData += `<strong>User ID:</strong> ${req.params.userId} <br/>`;
  myData += `<strong>Order ID:</strong> ${req.params.orderId} <br/>`;
  res.set('Content-type', 'text/html');
  res.send(myData);
});

app.post('/', (req, res) => {
  res.send('Hello World in POST method!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
