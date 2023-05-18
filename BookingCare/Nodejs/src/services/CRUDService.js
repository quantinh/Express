// Sử dụng thư viện bcryptjs để mã hóa password
import bcrypt from "bcryptjs";
// Sử dụng thư viện db để lấy các hàm trong file index.js
import db from "../models/index";
// Cần những mã hóa dạng muối để mã hóa password
const salt = bcrypt.genSaltSync(10);

// Hàm tạo mới user 
let createNewUser = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// Chờ đợi trong quá trình tạo mới user thì phải mã hóa password trước khi lưu vào database
			let hashPasswordFromBcrypt = await hashUserPassword(data.password);
			await db.User.create({
				email: data.email,
				password: hashPasswordFromBcrypt,
				firstName: data.firstName,
				lastName: data.lastName,
				address: data.address,
				phonenumber: data.phonenumber,
				gender: data.gender === "1" ? true : false,
				roleId: data.roleId,
			});
			resolve("Ok create new user success!");
			console.log(hashPasswordFromBcrypt);
		} catch (e) {
			reject(e);
		}
	});
	// console.log("data from service");
	// console.log(data);
};

// Hàm hỗ trợ mã hóa password
let hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			var hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};

// Hàm lấy tất cả dữ liệu trong bảng users
let getAllUser = () => {
	return new Promise(async (resolve, reject) => {
		try {
			// Gọi đến db ở models để lấy tất cả các bảng ghi dữ liệu ở bảng user
			let users = await db.User.findAll({
				raw: true,
			});
			// tương tự return
			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

// Hàm lấy thông tin user theo id của user
let getUserInfoById = (userId) => {
	return new Promise(async(resolve, reject) => {
		try {
			// Tìm kiểm bảng ghi user xem trường id có trùng với userId không
			let user = await db.User.findOne({
				where: {
					id: userId,
				},
				// Trả về dạng mảng
				raw: true,
			});
			// Kiểm tra nếu có user thì trả về user, nếu không thì trả về object rỗng
			user ? resolve(user) : resolve({});
		} catch (e) {
			reject(e);
		}
	});
}

// Hàm cập nhật thông tin user
let updateUserData = (data) => {
	return new Promise(async(resolve, reject) => {
		try {
			// Tìm kiếm 1 bảng ghi user khớp với id chũng ta nhân vào khi click từ url 
			let user = await db.User.findOne(data, {
				where: { id: data.id },
			});
			// Nếu thông tin user tồn tại thì cập nhập thông tin và lưu lại 
			if(user) {
				user.firstName = data.firstName;
				user.lastName = data.lastName;
				user.address = data.address;
				// Lưu lại các thông tin đó vào db
				await user.save();
				// Tiếp tục lấy ra tất cả thông tin từ bảng ghi user đã câp nhập
				let allUsers = await db.User.findAll();
				// Trả về thông tin tất cả user để hiển thị ra view bảng tất cả users và ngừng chương trình
				resolve(allUsers);
			} else {
				resolve();
			}
			// Trả về thông báo thành công
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

// Hàm xóa user theo id của user
let deleteUserById = (userId) => {
	return new Promise(async(resolve, reject) => {
		try {	
			let user = await db.User.findOne({
				where: { id: userId }
			});
			if (user) {
				await user.destroy();
			}
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createNewUser: createNewUser,
	getAllUser: getAllUser,
	getUserInfoById: getUserInfoById,
	updateUserData: updateUserData,
	deleteUserById: deleteUserById,
};
