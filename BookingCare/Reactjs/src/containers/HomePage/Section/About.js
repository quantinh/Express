import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
	render() {
		return (
			<div className="section-share section-about">
				<div className="section-about-header">
					Truyền thông nói về BookingCare
				</div>
				<div className="section-about-content">
					<div className="content-left">
						<iframe
							width="100%"
							height="400px"
							src="https://www.youtube.com/embed/FyDQljKtWnI"
							title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen>
						</iframe>
					</div>
					<div className="content-right">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
							quaerat ex nulla ducimus! Alias, repudiandae ratione! Aliquid unde
							laborum quaerat. Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Ducimus vero officiis recusandae alias delectus
							accusamus cupiditate beatae magnam voluptas ratione, error quae
							cumque accusantium exercitationem, nobis reiciendis sequi? Magni,
							reiciendis.
						</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
