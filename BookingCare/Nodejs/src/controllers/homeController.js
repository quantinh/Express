// Sử dụng thư viện db để lấy các hàm trong file index.js
import db from "../models/index";
// Sử dụng thư viện CRUDService để lấy các hàm trong file CRUDService.js
import CRUDService from "../services/CRUDService";

// Lấy dữ liệu và hiển thị trang homePage.ejs
let getHomePage = async (req, res) => {
	try {
		let data = await db.User.findAll();
		return res.render("homePage.ejs", {
			data: JSON.stringify(data),
		});
	} catch (e) {
		console.log(e);
	}
};

// Lấy dữ liệu và hiển thị trang aboutPage.ejs
let getAboutPage = (req, res) => {
	// return res.render("test/aboutPage.ejs");
	return res.render("aboutPage.ejs");
};

// Hiển thị trang thêm mới user
let getCRUD = (req, res) => {
	return res.render("crud.ejs");
};

// Thêm mới user vào database thành công và hiển thị thông tin thành công
let postCRUD = async (req, res) => {
	// req.body để lấy dược các tham số từ client gửi lên server
	// gọi đến hàm từ service để thực hiện các thao tác với database
	let message = await CRUDService.createNewUser(req.body);
	console.log(message);
	return res.send("post crud form server");
};

// Hiển thị tất cả dữ liệu trong bảng user in ra table
let displayGetCRUD = async (req, res) => {
	//Lấy tất cả dữ liệu từ từ bảng users
	let data = await CRUDService.getAllUser();
	return res.render("displayCRUD.ejs", { dataTable: data });
};

// Hiển thị trang chỉnh sửa dữ liệu khi click vào nút chỉnh sửa
let getEditCRUD = async (req, res) => {
	// Lấy id của user từ form 
	let userId = req.query.id;
	// console.log(req.query.id);
	// Nếu id tồn tại 
	if (userId) {
		// Thì gọi đến hàm getUserInfoById trong CRUDService để lấy thông tin user theo id
		let userData = await CRUDService.getUserInfoById(userId);
		// console.log(userData);
		// Gửi dữ liệu thông tin user đó qua view 
		return res.render("editCRUD.ejs", {
			user: userData,
		});
	// Nếu id không tồn tại tức là bảng ghi đó không có thông tin thì hiển thị lỗi 
	} else {
		return res.send("Users not found!");
	}
};

// Cập nhật dữ liệu vào database
let putCRUD = async (req, res) => {
	// Lấy các thông tin như firstName = value, ... 
	let data = req.body;
	// Gọi đến hàm updateUserData trong CRUDService để cập nhật dữ liệu
	let allUsers = await CRUDService.updateUserData(data);
	// console.log(allUsers);
	return res.render("displayCRUD.ejs", { 
		dataTable: allUsers 
	});
};

// Xóa dữ liệu trong database
let deleteCRUD = async (req, res) => {
	// lấy ra id từ url ?id = 1
	let id = req.query.id;
	if(id) {
		// Gọi đến hàm deleteUserData trong CRUDService để xóa dữ liệu
		await CRUDService.deleteUserById(id);
		return res.send("Delete the user success!");
	} else {
		return res.send("User not found!");
	}
};

// Xuất ra dạng object {key: value}
module.exports = {
	getHomePage: getHomePage,
	getAboutPage: getAboutPage,
	getCRUD: getCRUD,
	postCRUD: postCRUD,
	displayGetCRUD: displayGetCRUD,
	getEditCRUD: getEditCRUD,
	putCRUD: putCRUD,
	deleteCRUD: deleteCRUD,
};
