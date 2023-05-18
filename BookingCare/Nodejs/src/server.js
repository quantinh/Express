// Sử dụng thư viện express
import express from 'express';
// Sử dụng thư viện body-parser để lấy các tham số dữ liệu từ client gửi lên
import bodyParser from 'body-parser';
// Sử dụng thư viện viewEngine để cấu hình hiển thị view
import viewEngine from './config/viewEngine';
// Sử dụng thư viện webRoutes để cấu hình các đường dẫn cho client
import initWebRoutes from './routes/web';
// Sủ dụng thư viện connectDB để kết nối đến database mysql
import connectDB from './config/connectDB';
// Sử dụng thư viện cors để cho phép các domain khác truy cập vào server
// import cors from 'cors';

// Sử dụng thư viện dotenv để lấy các tham số trong file .env
require('dotenv').config();

let app = express();
// Sử dụng thư viện cors để cho phép các domain khác truy cập vào server
// app.use(cors({ origin: true}));

// Định nghĩa middleware
// Add headers before the routes are defined
app.use(function (req, res, next) {
      // Website you wish to allow to connect, cho phép cổng 3000 truy cập vào server , sử dụng link đường dẫn vì sau này deploy lên server chỉ cần cấu hình lại link đường dẫn ở file .env thôi
      res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
      // Pass to next layer of middleware
      next();
});

// config app 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

// Lấy được tham số của port trong file .env nếu port === undefined thì lấy port mặc định là 6969
let port = process.env.PORT || 6969;

// Lắng nghe port để chạy server
app.listen(port, () => {
      console.log("Backend is start at port :" + port);
});
