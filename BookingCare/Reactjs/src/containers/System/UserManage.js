import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
	
	// === Life cycle ===
	// Run component
	// 1. run constructor -> init state
	// 2. did mount  gán giá trị cho setState
	// 3. render - rerender: update component

	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			isOpenModalUser: false,
			isOpenModalEditUser: false,
			userEdit: {}
		};
	}

	state = {};

	async componentDidMount() {
		// Gọi api bằng phương thức axios.get từ userService.js mặt định lấy tất cả người dùng
		// let response = await getAllUsers("ALL");
		// Kiểm tra dữ liệu có tồn tại và không có lỗi thì gán giá trị cho state
		// if (response && response.errCode === 0) {
			// Cập nhập dữ liệu lấy từ server vào state
			// this.setState(
			// 	{
			// 		arrUsers: response.users,
			// 	},
				// () => {
				// 	console.log("check state user:", this.setState.arrUsers);
				// }
			// );
			// console.log("check state user 1:", this.setState.arrUsers);
		// }
		// console.log("get user from node.js response:", response);
		await this.getAllUsersFromReact();
	}

	getAllUsersFromReact = async () => {
		let response  = await getAllUsers('ALL');
		if(response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users
			})
		}
	}
	
	handleAddNewUser = () => {
		this.setState({
			isOpenModalUser: true,
		});
	}

	toggleUserModal = () => {
		this.setState({
			isOpenModalUser: !this.state.isOpenModalUser,
		})
	}

	toggleUserEditModal = () => {
		this.setState({
			isOpenModalEditUser: !this.state.isOpenModalEditUser,
		})
	}

      createNewuser = async (data) => {
            // alert("call me");
		try {
			let response = await createNewUserService(data);
			if(response && response.errCode !== 0) {
				alert(response.errMessage);
			} else {
				await this.getAllUsersFromReact();
				this.setState({
					isOpenModalUser: false,
				})
				// fire event cho con hứng
				emitter.emit('EVENT_CLEAR_MODAL_DATA');
			}
		} catch(e) {
			console.log(e);
		}
		// console.log('check data form child:', data);
      }

	handleDeleteUser = async (user) => {
		console.log('Click delete:', user);
		try {
			// Gọi api với id người dùng đang click đó
			let res = await deleteUserService(user.id);
			// Nếu có dữ liệu gọi api về và errCode === 0 thì lấy tất cả user render lại giao diện không load trang
			if(res && res.errCode === 0) {
				await this.getAllUsersFromReact();
			// Ngược lại thì alert 
			} else {
				alert(res.errMessage);
			}
			// console.log('response:', res);
		} catch(e) {
			console.log(e);
		}
	}

	handleEditUser = (user) => {
		console.log('Check edit user:', user);
		this.setState({
			isOpenModalEditUser: true,
			userEdit: user
		})
	}

	doEditUser = async (user) => {
		// console.log('click save user do edit:', user)
		try {
			let res = await editUserService(user);
			if(res && res.errCode === 0) {
				this.setState({
					isOpenModalEditUser: false
				})
				await this.getAllUsersFromReact()
			} else {
				alert(res.errCode);
			}
		} catch(e) {
			console.log(e);
		}
	}

	render() {
		// Lưu tạm dữ liệu vào biến để map ra giao diện
		let arrUsers = this.state.arrUsers;
		return (
			<div className="users-container">
				<ModalUser
					isOpen={this.state.isOpenModalUser}
					toggleFromParent={this.toggleUserModal}
					createNewuser={this.createNewuser}
				/>
				{/* Nếu isOpenModalEditUser = true thì mói in ra component này */}
				{
					this.state.isOpenModalEditUser && 
					<ModalEditUser
						isOpen={this.state.isOpenModalEditUser}
						toggleFromParent={this.toggleUserEditModal}
						currentUser={this.state.userEdit}
						editUser={this.doEditUser}
					/>
				}
				<div className="text-center title">Manage users</div>
				<div className="mx-1">
					<button 
						className="px-3 btn btn-primary"
						onClick={() => this.handleAddNewUser()}
					><i className="fas fa-plus add-plus"></i>Add new users
					</button>
				</div>
				<div className="mx-1 mt-3 users-table">
					<table id="customers">
					<tbody>
						<tr>
							<th>FirstName</th>
							<th>LastName</th>
							<th>Email</th>
							<th>Address</th>
							<th>Actions</th>
						</tr>
						{arrUsers &&
							arrUsers.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.firstName}</td>
										<td>{item.lastName}</td>
										<td>{item.email}</td>
										<td>{item.address}</td>
										<td>
											<button className="btn-edit" onClick={ () => this.handleEditUser(item) }><i className="fas fa-edit"></i></button>
											<button className="btn-del" onClick={ () => this.handleDeleteUser(item) }><i className="fas fa-solid fa-trash"></i></button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
