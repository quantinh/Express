import React, { Component } from "react";
import { connect } from "react-redux";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div classNameName="user-redux-container">
        <div classNameName="title">User Redux</div>
        <div classNameName="user-redux-body">
          <div classNameName="container">
              <div className="row">
                <div className="col-12">
                    <FormmattedMessage id="manage-user.add"/>
                </div>
                <div className="col-3">
                  <label><FormmattedMessage id="manage-user.email"/></label>
                  <input classNameName="form-control" type="email"/>
                </div>
                <div className="col-3">
                  <label><FormmattedMessage id="manage-user.password"/></label>
                  <input classNameName="form-control" type="password"/>
                </div>
                <div className="col-3">
                  <label><FormmattedMessage id="manage-user.last-name"/></label>
                  <input classNameName="form-control" type="firtname"/>
                </div>
                <div className="col-3">
                  <label><FormmattedMessage id="manage-user.phone-number"/></label>
                  <input classNameName="form-control" type="text"/>
                </div>
                <div className="col-3">
                  <label><FormmattedMessage id="manage-user.address"/></label>
                  <input classNameName="form-control" type="text"/>
                </div>
                <div className="col-9">
                  <label>Address</label>
                  <input classNameName="form-control" type="text"/>
                </div>
                <div className="col-3">
                    <label>Gender</label>
                    <select id="inputState" className="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                    {/* npm uninstall bootstrap */}
                </div>
              </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
