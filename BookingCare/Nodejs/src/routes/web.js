// Sử dụng thư viện express để tạo router
import express from "express";
// Sử dụng thư viện homeController để lấy các hàm trong file homeController.js
import homeController from "../controllers/homeController";
// Sử dụng thư viện userController để lấy các hàm trong file userController.js
import userController from "../controllers/userController";
// Sử dụng thư viện express để tạo router
let router = express.Router();

// Khởi tạo các router theo chuẩn restAPI
let initWebRoutes = (app) => {
	// Định tuyến hiển thị trang chủ home
	router.get("/", homeController.getHomePage);
	// Định tuyến hiển thị trang about
	router.get("/about", homeController.getAboutPage);
	// Định tuyến hiển thị trang form
	router.get("/crud", homeController.getCRUD);
	// ============================== router ============================== 
	// Định tuyến thêm dữ liệu vào database
	router.post("/post-crud", homeController.postCRUD);
	// Định tuyến lấy dữ liệu từ database hiển thị
	router.get("/get-crud", homeController.displayGetCRUD);
	// Định tuyến chỉnh sửa dữ liệu 
	router.get("/edit-crud", homeController.getEditCRUD);
	// Định tuyến chỉnh sửa dữ liệu 
	router.post("/put-crud", homeController.putCRUD);
	// Định tuyến chỉnh sửa dữ liệu 
	router.get("/delete-crud", homeController.deleteCRUD);
	// ============================== API ============================== 
	// Định tuyến login lấy dữ liệu
	router.post("/api/login", userController.handleLogin);
	// Định tuyến lấy tất cả những user hiển thị
	router.get("/api/get-all-users", userController.handleGetAllUsers);
	// Định tuyến thêm mới user
	router.post('/api/create-new-user', userController.handleCreateNewUser);
	// Định tuyến update user
	router.put('/api/edit-user', userController.handleEditUser);
	// Định tuyến xóa user
	router.delete('/api/delete-user', userController.handleDeleteUser);
	// Định tuyến lấy tất cả allcode
	router.get('/api/allcode', userController.getAllCode);
	
	// Định tuyến sửa user
	// router.get("/hoidanit", (req, res) => {
	//       return res.send("Hello world with hoidanit");
	// });

	return app.use("/", router);
};

module.exports = initWebRoutes;
