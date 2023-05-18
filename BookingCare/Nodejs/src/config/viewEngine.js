//Sử dụng thư viện express
import express from 'express';

// Cấu hình hiển thị view 
let configViewEngine = (app) => {
      //Cấu hình đường dẫn tĩnh để client có thể truy cập lấy trong thư mục public
      app.use(express.static('./src/public'));
      //Cấu hình view engine .esj (là một thư viện) tương tự .blade của php viết tượng tự html
      app.set('view engine', 'ejs');
      //Cấu hình các file được viết ở views nằm trong thư mục views cứ trỏ vào views là được
      app.set('views', './src/views');
}
module.exports = configViewEngine;