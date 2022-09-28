import "./Header.css";
import { ShoppingBasket, Search } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
	/* 
	&&는 if(!user){"/login"} 
	즉, 참이면 설정된 값 반환 거짓이면 아무것도 안한다.
	*/
	const navigate = useNavigate();
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
					<span className="header_option_firstLine">안녕하세요</span>

					<Link to={!user && "/login"} className="homeLogin">
						<span onClick={handleAuth} className="header_option_secondLine">
							{user ? "로그아웃" : "로그인"}
						</span>
					</Link>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">돌아가기</span>
					<span className="header_option_secondLine">주문하기</span>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">반가워요</span>
					<span className="header_option_secondLine">구독과좋아요</span>
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
