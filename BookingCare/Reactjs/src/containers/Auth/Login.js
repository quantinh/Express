import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { FormattedMessage } from "react-intl";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			isShowPassword: false,
			errMessage: "",
		};
	}
	handleOnchangeUsername = (e) => {
		this.setState({
			username: e.target.value,
		});
	};
	handleOnchangePassword = (e) => {
		this.setState({
			password: e.target.value,
		});
	};
	handleShowHidePassword = () => {
		this.setState({
			//Lấy giá trị ngược lại của isShowPassword mặc định là false là ẩn password và ẩn icon eye
			isShowPassword: !this.state.isShowPassword,
		});
	};
	handleLogin = async () => {
		// console.log('username:', this.state.username, 'password:', this.state.password)
		// console.log("all state:", this.state);

		// Trước khi chưa click thì xóa thông báo lỗi để lỡ có lỗi thì sẽ hiển thị thông báo lỗi mới
		this.setState({
			errMessage: "",
		});
		// Cố gắng gọi api từ phía server
		try {
			let data = await handleLoginApi(this.state.username, this.state.password);
			// Kiểm tra nếu có lỗi thì hiển thị thông báo lỗi
			if(data && data.errCode !== 0) {
				this.setState({
					errMessage: data.message,
				});
			}
			// Nếu không có lỗi thì hiển thị thông tin user dùng redux
			if(data && data.errCode === 0) {
				this.props.userLoginSuccess(data.user)
				console.log("login success");
			}
			// console.log("Dữ liệu từ server trả về:", data);
		} catch (e) {
			// console.log(e);
			if (e.response) {
				if (e.response.data) {
					this.setState({
						errMessage: e.response.data.message
					});
				}
			}
		}
	};
	render() {
		return (
			<div className="login-background">
				<div className="login-container">
					<div className="login-content row">
						<div className="col-12 text-login">Login</div>
						<div className="col-12 form-group login-input">
							<label htmlFor="">Username:</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter your username"
								value={this.state.username}
								onChange={(e) => this.handleOnchangeUsername(e)}
							/>
						</div>
						<div className="col-12 from-group login-input">
							<label htmlFor="">Password:</label>
							<div className="custom-input-password">
								<input
									type={this.state.isShowPassword ? "text" : "password"}
									className="form-control"
									placeholder="Enter your password"
									value={this.state.password}
									onChange={(e) => this.handleOnchangePassword(e)}
								/>
								<span onClick={() => this.handleShowHidePassword()}>
									<i
										className={
											this.state.isShowPassword
												? "far fa-eye"
												: "far fa-eye-slash"
										}
									></i>
								</span>
							</div>
						</div>
						<div className="col-12" style={{ color: "red" }}>
							{this.state.errMessage}
						</div>
						<div className="col-12">
							<button className="btn-login" onClick={() => this.handleLogin()}>
								Login
							</button>
						</div>
						<div className="col-12">
							<span className="forgot-password">Forgot your password ?</span>
						</div>
						<div className="mt-3 text-center col-12">
							<span className="text-other-login">Or Login with:</span>
						</div>
						<div className="col-12 social-login">
							<i className="fab fa-google-plus-g google"></i>
							<i className="fab fa-facebook-f facebook"></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		// userLoginFail: () => dispatch(actions.userLoginFail()),
		userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
