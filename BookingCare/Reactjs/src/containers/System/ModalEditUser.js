import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import _ from 'lodash';

class ModalEditUser extends Component {
	constructor(props) {
            // Kế thừa từ cha truyền xuống
            super(props);
            this.state = {
                  id: '',
                  email: '',
                  password: '',
                  firstName: '',
                  lastName: '',
                  address: '',
            }
      }

      componentDidMount() {
            let user = this.props.currentUser;
            //Nếu object ko rỗng thì thực thi
            if(user && !_.isEmpty(user)) {
                  this.setState({
                        id: user.id,
                        email: user.email,
                        password: 'harcode',
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address: user.address,
                  })
            }
            console.log('didmount edit modal', this.props.currentUser);
      }

      toggle = () => {
            this.props.toggleFromParent();
      }

      handleOnchangeInput = (event, id) => {
            let copyState = {...this.state};
            copyState[id] = event.target.value;
            this.setState({
                  ...copyState
            });
      }

      checkValidateInput = () => {
            let isValid = true;
            let arrInput = [
                  'email', 
                  'password', 
                  'firstName', 
                  'lastName', 
                  'address'
            ];
            // good code 
            for(let i = 0; i < arrInput.length; i++) {
                  // arrInput[i]: email field nhập , this.state[arrInput[i]]: là giá trị khi nhập
                  console.log('check inside loop:', this.state[arrInput[i]], arrInput[i]);
                  // Kiểm tra xem đã có nếu field nào đó chưa nhập thì trả về flase alert thông báo 
                  if(!this.state[arrInput[i]]) {
                        isValid = false;
                        alert('Missing parameter: '+ arrInput[i]);
                        break;
                  }
            }
            //Nếu như đã nhập giá trị vào input thì hợp lệ thoát khỏi vòng lặp và trả về true
            return isValid;
      }

      handleSaveUser = () => {
            let isValid = this.checkValidateInput();
            if (isValid === true) {
                  this.props.editUser(this.state);
            }
      }

	render() {
		return (
                  <>
                        <Modal
                              isOpen={this.props.isOpen}
                              toggle={() => {this.toggle()}}
                              className={'modal-user-container'}
                              size="lg"
                        >
                              <ModalHeader toggle={() => { this.toggle() }}>Edit a new user</ModalHeader>
                              <ModalBody>
                                    <div className="modal-user-body">
                                          <div className="input-container">
                                                <label>Email</label>
                                                <input 
                                                      type="email" 
                                                      onChange={(event) => { this.handleOnchangeInput(event, "email")}}
                                                      value={this.state.email}
                                                      disabled
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label>Password</label>
                                                <input 
                                                      type="password" 
                                                      onChange={(event) => { this.handleOnchangeInput(event, "password")}}
                                                      value={this.state.password}
                                                      disabled
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label>First name</label>
                                                <input 
                                                      type="firstName" 
                                                      onChange={(event) => { this.handleOnchangeInput(event, "firstName")}}
                                                      value={this.state.firstName}
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label>Last name</label>
                                                <input 
                                                      type="lastName" 
                                                      onChange={(event) => { this.handleOnchangeInput(event, "lastName")}}
                                                      value={this.state.lastName}
                                                />
                                          </div>
                                          <div className="input-container max-width-input">
                                                <label>address</label>
                                                <input 
                                                      type="address" 
                                                      onChange={(event) => { this.handleOnchangeInput(event, "address")}}
                                                      value={this.state.address}
                                                />
                                          </div>
                                    </div>
                              </ModalBody>
                              <ModalFooter>
                                    <Button 
                                          color="primary" 
                                          className="px-3" 
                                          onClick={() => {this.handleSaveUser()}}
                                    >
                                          Save changes
                                    </Button>{" "}
                                    <Button 
                                          color="secondary" 
                                          className="px-3" 
                                          onClick={() => {this.toggle()}}
                                    >
                                          Close
                                    </Button>
                              </ModalFooter>
                        </Modal>
                  </>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
