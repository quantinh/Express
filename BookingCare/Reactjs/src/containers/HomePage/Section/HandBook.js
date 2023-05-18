import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class HandBook extends Component {
	render() {
		return (
			<div className="section-share section-handBook">
				<div className="section-container">
					<div className="section-header">
						<span className="title-section">Cẩm nang</span>
						<button className="btn-section">Xem thêm</button>
					</div>
					<div className="section-body">
						<Slider {...this.props.settings}>
							<div className="section-customize">
								<div className="outer-bg">
									<div className="bg-image section-handbook" />
								</div>
								<div className="text-center position">
									<div>Giáo sư, Tiến sĩ</div>
									<div>Cơ Xương khớp 1</div>
								</div>
							</div>
							<div className="section-customize">
								<div className="outer-bg">
									<div className="bg-image section-handbook" />
								</div>
								<div className="text-center position">
									<div>Giáo sư, Tiến sĩ</div>
									<div>Cơ Xương khớp 2</div>
								</div>
							</div>
							<div className="section-customize">
								<div className="outer-bg">
									<div className="bg-image section-handbook" />
								</div>
								<div className="text-center position">
									<div>Giáo sư, Tiến sĩ</div>
									<div>Cơ Xương khớp 3</div>
								</div>
							</div>
							<div className="section-customize">
								<div className="outer-bg">
									<div className="bg-image section-handbook" />
								</div>
								<div className="text-center position">
									<div>Giáo sư, Tiến sĩ</div>
									<div>Cơ Xương khớp 4</div>
								</div>
							</div>
						</Slider>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
