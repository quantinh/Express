// Sử dụng userService để xử lí login check email và password người dùng nhập vào
import userService from '../services/userService';


// Hàm xử lí login
let handleLogin = async(req, res) => {
      // Lấy value email và password từ người giao diện login người dùng nhập từ client 
      let email = req.body.email;
      let password = req.body.password;

      // check email exist
      // compare password
      // return userInfo
      // access_token: JWT

      // Kiểm tra nếu không có email hoặc password thì trả về thông báo lỗi
      if(!email || !password) {
            return res.status(500).json({
                  errCode: 1,
                  message: "Missing inputs parameters !"
            });
      }
      // Gọi hàm xử lí login từ userService để check thông tin email và password người dùng nhập vào
      let userData = await userService.handleUserLogin(email, password);
	// console.log(userData);
      // Nếu dữ liệu người dùng nhập đúng thì trả về giao diện thông báo thành công và in ra giao diện thông báo đó và ngược lại trả về thông báo thất bại
      return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
      });
};

// Hàm xử lí lấy tât cả user
let handleGetAllUsers = async(req, res) => {
      let id = req.query.id; //ALL (lấy tất cả người dùng), id (lấy 1 người dùng)
      // console.log(id);

      // Kiểm tra nếu không có user thì trả về thông báo lỗi
      if(!id) {
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing required parameters !",
                  users: []
            });
      }
      // Nếu có id thì gọi hàm getAllUsers từ userService để lấy tất cả user trong db trả về client
      let users = await userService.getAllUsers(id);
      // console.log(users);
      // Nếu có thì hiển thị user
      return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            users
      });
};

// Hàm xử lí tạo mới user
let handleCreateNewUser = async(req, res) => { 
       // Lấy các thông tin nhập giá trị như firstName = value, ... 
	let data = req.body;
      let message = await userService.createNewUser(data);
      // console.log(message);
      return res.status(200).json(message);
};

// Hàm xử lí update user
let handleEditUser = async (req, res) => {
      // Lấy các thông tin nhập giá trị như firstName = value, ... 
	let data = req.body;
      // console.log(data);
	// Gọi đến hàm updateUserData trong CRUDService để cập nhật dữ liệu
	let message = await userService.updateUserData(data);
	return res.status(200).json(message)
};

// Hàm xử lí xóa user
let handleDeleteUser = async (req, res) => {
      // lấy ra id từ url ?id = 1
	let id = req.body.id;
	if(!id) {
            // Gọi đến hàm deleteUserData trong CRUDService để xóa dữ liệu
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing required parameters !",
            });
      } 
      let message = await userService.deleteUser(id);
      // console.log(message);
      return res.status(200).json(message);
};

// Hàm xử lí 
let getAllCode = async (req, res) => {
      try {
            let data = await userService.getAllCodeService(req.query.type);
            console.log(data);
            return res.status(200).json(data);
      } catch (e) {
            console.log('Get all code error:', e);
            return res.status(200).json({
                  errCode: -1,
                  errMessage: "Error from server",
            })
      }
}

module.exports = {
	handleLogin: handleLogin,
      handleGetAllUsers: handleGetAllUsers,
      handleCreateNewUser: handleCreateNewUser,
      handleEditUser: handleEditUser,
      handleDeleteUser: handleDeleteUser,
      getAllCode: getAllCode,
};
