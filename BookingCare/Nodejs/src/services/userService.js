// Sử dụng thư viện db để lấy các hàm trong file index.js
import db from "../models/index";
// Sử dụng thư viện bcryptjs để mã hóa password
import bcrypt from "bcryptjs";
// Cần những mã hóa dạng muối để mã hóa password
const salt = bcrypt.genSaltSync(10);

// Hàm xử lí đăng nhập của thành viên 
let handleUserLogin = (email, password) => {
      return new Promise(async(resolve, reject) => {
            try {
                  // Tạo object rỗng để trả về thông báo khi thành công hoặc thất bại
                  let userData = {};
                  // Kiểm tra email người dùng nhập đã tồn tại trong db chưa ? nếu tồn tại thì trả về true ngược lại trả về false
                  let isExist = await checkUserEmail(email);
                  // Kiểm tra user đó đã tồn tại email ở db chưa nếu tồn tại thì trả dữ liệu ra 
                  if(isExist) {
                        //1) Tiếp tục tìm kiếm xem email người dùng nhập đó có tồn tại trong db hay không nếu có true
                        let user = await db.User.findOne({
                              attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                              where: { email: email },
                              raw: true
                        });
                        // Kiểm tra nếu email có true thì so sánh tiếp password
                        if(user) {
                              //2) So sánh tiếp password người dùng nhập vào với password trong db
                              let check = await bcrypt.compareSync(password, user.password);
                              // Nếu true thì trả về thông báo thành công và ngược lại trả về thông báo thất bại
                              if(check) {
                                    userData.errCode = 0;
                                    userData.errMessage = "OK";
                                    delete user.password;
                                    userData.user = user;
                              } else {
                                    userData.errCode = 3;
                                    userData.errMessage = "Wrong password";
                              }
                        } else {
                              userData.errCode = 2;
                              userData.errMessage = `User's not found`;
                        }
                  } else {
                        // Nếu không tồn tại thì trả về thông báo
                        // return err
                        userData.errCode = 1;
                        userData.errMessage = `Your's email is not exist in your system. Please try again!`;
                  }
                  resolve(userData);
            } catch (e) {
                  reject(e);
            }
      });
}

// Hàm xử lí kiểm tra email đã tồn tại trong db chưa
let checkUserEmail = (userEmail) => {
      return new Promise(async(resolve, reject) => { 
            // kiểm tra nếu có lỗi thì trả về reject
            try {
                  // Tìm kiếm 1 bảng ghi trong db xem email người dùng nhập đó đã tồn tại trên db chưa
                  let user = await db.User.findOne({
                        where: { email: userEmail }
                  });
                  // Nếu true thì trả về true thoát khỏi hàm và ngược lại trả về false
                  user ? resolve(true) : resolve(false);
            } catch (e) {
                  reject(e);
            }
      });
}

// Hàm lấy tất cả thành viên từ db
let getAllUsers = (userId) => {
      return new Promise(async(resolve, reject) => {
            try {
                  let users = '';
                  // Nếu userId = ALL thì trả về tất cả user trong db
                  if(userId === "ALL") {
                        users = await db.User.findAll({
                              // Lấy các field ngoại trừ password
                              attributes: {
                                    exclude: ['password']
                              }
                        });
                  } 
                  // Nếu userId tồn tại và không phải ALL thì trả về user có id = userId
                  if (userId && userId !== "ALL") {
                        users = await db.User.findOne({
                              where: { id: userId },
                              attributes: {
                                    exclude: ['password']
                              }
                        });
                  }
                  // return về biến users có giá trị gì 
                  resolve(users);
            } catch(e) {
                  reject(e);
            }
      });
}

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

// Hàm tạo mới user thành viên
let createNewUser = (data) => {
      return new Promise(async(resolve, reject) => {
            try {
                  // check email is exits
                  let check = await checkUserEmail(data.email);
                  // Nếu tồn tại rồi thì không cho tạo nữa trả về lỗi
                  if(check === true) {
                        resolve({
                              errCode: 1,
                              errMessage: "Your email is already in used, Please try another email",
                        });
                  } else {
                        // Nếu chưa thì Chờ đợi trong quá trình tạo mới user thì phải mã hóa password trước khi lưu vào database
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
                        resolve({
                              errCode: 0,
                              errMessage: "OK",
                        });
                  }
			// console.log(hashPasswordFromBcrypt);
            } catch(e) {
                  reject(e);
            }
      });
};

// Hàm xóa user thành viên
let deleteUser = (id) => {
      return new Promise(async(resolve, reject) => {
		try {	
                  // Tìm kiếm user có id = id đó trong db trả ra người dùng đó nếu có
			let user = await db.User.findOne({
				where: { id: id },
			});
                  // Nếu người dùng false tức là không tồn tại trên db thì hiển thị thông báo lỗi
			if(!user) {
                        resolve({
                              errCode: 2,
                              errMessage: "The user isn't exist"
                        })
                  }
                  // Nếu có tức là true thì xóa user đó trong db
                  await db.User.destroy({
                        where: { id: id }
                  });
                  // Trả về thông báo đã xóa thành công
                  resolve({
                        errCode: 0,
                        message: "The user is delete"
                  });
			resolve();
		} catch (e) {
			reject(e);
		}
	});
}

// Hàm cập nhật thông tin thành viên
let updateUserData = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
                  console.log('check nodejs', data);
                  // Nếu không có dữ liệu người dùng nhập gửi lên thì báo lỗi 
                  if(!data.id) {
                        resolve({
                              errCode: 2,
                              errMessage: 'Missing required parameters'
                        })
                  }
			// Nếu có dữ liệu người dùng nhập thì tìm kiếm 1 bảng ghi user khớp với id chũng ta nhân vào khi click từ url 
			let user = await db.User.findOne(data, {
				where: { id: data.id },
                        raw: false
			});
			// Nếu thông tin user tồn tại thì cập nhập thông tin và lưu lại vào đatabase
			if(user) {
                        user.firstName = data.firstName;
				user.lastName = data.lastName;
				user.address = data.address;
				// Lưu lại các thông tin đó vào db
				await user.save();
				// Trả về thông tin tất cả user để hiển thị ra view bảng tất cả users và ngừng chương trình báo thành công
				resolve({
                              errCode: 0,
                              message: "Update the user success !",
                        })
			} else { // Ngược lại nếu thông tin không có ở database thì báo là thông tin không tồn tại
				resolve({
                              errCode: 1,
                              errMessage: "User's not found !"
                        });
			}
            // Trả về lỗi nếu không trả về dữ liệu thành công khi cập nhật
		} catch (e) {
			reject(e);
		}
	})
};

// Hàm lấy tất cả allcode
let getAllCodeService = (typeInput) => {
      return new Promise(async(resolve, reject) => {
            try {
                  //Nếu trên url không có query ?type=input thì hiển thị lỗi 1
                  if (!typeInput) {
                        resolve({
                              errCode: 1,
                              errMessage: 'Missing required parameters !'
                        })
                  } else {
                        let res = {};
                        let allcode = await db.Allcode.findAll({
                              where: { type: typeInput }
                        });
                        res.errCode = 0;
                        res.data = allcode;
                        resolve(res);
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      handleUserLogin: handleUserLogin,
      createNewUser: createNewUser,
      getAllUsers: getAllUsers,
      updateUserData: updateUserData,
      deleteUser: deleteUser,
      getAllCodeService: getAllCodeService
}