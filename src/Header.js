import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { ShoppingBasket } from "@material-ui/icons";

function Header() {
	return (
		<div className="header">
			<img
				className="header_logo"
				src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
			/>

			<div className="header_search">
				<input className="header_searchInput" type="" />
				<SearchIcon className="header_searchIcon" />
			</div>

			<div className="header_nav">
				<div className="header_option">
					<span className="header_option_firstLine">안녕하세요</span>
					<span className="header_option_secondLine">로그인하기</span>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">돌아가기</span>
					<span className="header_option_secondLine">주문하기</span>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">반가워요</span>
					<span className="header_option_secondLine">구독과좋아요</span>
				</div>

				<div className="header_option">
					<span className="header_option_basket">
						<ShoppingBasket />
						<span className="header_option_basketCount">0</span>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Header;
