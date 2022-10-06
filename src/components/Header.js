import "../styles/Header.css";

import { useStateValue } from "../stores/StateProvider";
import { auth } from "../stores/firebase";

import { Link } from "react-router-dom";
import { ShoppingBasket, Search } from "@material-ui/icons";

function Header() {
	/* 
	&&는 if(!user){"/login"} 
	즉, 참이면 설정된 값 반환 거짓이면 아무것도 안한다.
	*/

	const [{ basket, user }, dispatch] = useStateValue();

	const handleAuth = () => {
		if (user) {
			auth.signOut();
		}
	};

	return (
		<div className="header">
			<Link to="/">
				<img
					className="header_logo"
					src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt=""
				/>
			</Link>
			<div className="header_search">
				<input className="header_searchInput" type="" />
				<Search className="header_searchIcon" />
			</div>

			<div className="header_nav">
				<div className="header_option">
					<span className="header_option_firstLine">
						{!user ? "게스트" : user.email}
					</span>

					<Link to={!user && "/login"} className="homeLogin">
						<span onClick={handleAuth} className="header_option_secondLine">
							{user ? "로그아웃" : "로그인"}
						</span>
					</Link>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">돌아가기</span>
					<Link to={"/order"} className="homeOrder">
						<span className="header_option_secondLine">주문하기</span>
					</Link>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">hyukzz</span>
					<span className="header_option_secondLine">반갑습니다</span>
				</div>

				<Link to="/basket">
					<div className="header_option">
						<span className="header_option_basket">
							<ShoppingBasket />
							<span className="header_option_basketCount">
								{basket?.length}
							</span>
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;
