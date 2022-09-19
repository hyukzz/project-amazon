import React from "react";
import "./Header.css";

function Header() {
	return (
		<div className="header">
			<img
				className="header_logo"
				src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
			/>

			<div className="header_search">
				<input className="header_searchInput" type="" />
			</div>

			<div className="header_nav">
				<div className="header_option">
					<span className="header_option_firstLine">안녕하세요</span>
					<span className="header_option_secondtLine">로그인하기</span>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">돌아가기</span>
					<span className="header_option_secondtLine">주문하기</span>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">반가워요</span>
					<span className="header_option_secondtLine">구독과좋아요</span>
				</div>
			</div>
		</div>
	);
}

export default Header;
