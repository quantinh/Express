import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
	constructor(props) {
            // Kế thừa từ cha truyền xuống
            super(props);
            this.state = {
                  email: '',
                  password: '',
                  firstName: '',
                  lastName: '',
                  address: '',
            }
            // Thêm component khi contruct khai 
            this.listenToEmitter();
      }

      // Nghe sự kiện
      listenToEmitter () {
            emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
                  this.setState({
                        email: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        address: "",
                  })
                  // console.log('listen emitter from parent');
            });
      }
      
      componentDidMount() {
            // console.log('mounting modal');
      }
      
      toggle = () => {
            this.props.toggleFromParent();
      }

      handleOnchangeInput = (event, id) => {
            // Bad code 
            // this.state[id] = e.target.value;
            // this.state = {
            //    email: '',
            //    password: ''   
            // }
            // this.state.email === this.state['email']

            // Good code
            let copyState = { ...this.state };
            copyState[id] = event.target.value;
            this.setState({
                  ...copyState
            });

            // console.log('copyState', copyState);
            // console.log('event 1:', e.target.value.id);
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

            // bad code 
            // if(!this.state.email) {
            //       alert('Missing parameter');
            //       return false;
            // }

            // good code 
            for(let i = 0; i < arrInput.length; i++) {
                  //arrInput[i]: email field nhập , this.state[arrInput[i]]: là giá trị khi nhập
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

      handleAddNewUser = () => {
            let isValid = this.checkValidateInput();
            if(isValid === true) {
                  this.props.createNewuser(this.state, 'abc');
            }
      }

	render() {
            // console.log("check props", this.props);
            // console.log("check state", this.props.isOpen);
		return (
                  <>
                        <Modal
                              isOpen={this.props.isOpen}
                              toggle={() => {this.toggle()}}
                              className={'modal-user-container'}
                              size="lg"
                        >
                              <ModalHeader toggle={() => {this.toggle()}}>Create a new user</ModalHeader>
                              <ModalBody>
                                    <div className="modal-user-body">
                                          <div className="input-container">
                                                <label>Email</label>
                                                <input 
                                                      type="email" 
                                                      onChange={(event) => { this.handleOnchangeInput(event, "email")}}
                                                      value={this.state.email}
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label>Password</label>
                                                <input 
                                                      type="password" 
                                                      onChange={(event) => { this.handleOnchangeInput(event, "password")}}
                                                      value={this.state.password}
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
                                          onClick={() => {this.handleAddNewUser()}}
                                    >
                                          Add new
                                    </Button>{" "}
                                    <Button 
                                          color="danger" 
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
