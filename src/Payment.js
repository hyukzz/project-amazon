import "./Payment.css";
import { useState } from "react";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import BasketProduct from "./BasketProduct";
import { ShoppingBasket } from "@material-ui/icons";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const [error, setError] = useState(null);

	const stripe = useStripe();
	const elements = useElements(true);

	const handleSubmit = () => {};
	return (
		<div className="payment">
			<div className="payment_container">
				<Link to="/basket" className="basket_link">
					<h2>
						<ShoppingBasket className="basket-icon" />
						장바구니로 돌아가기
					</h2>
				</Link>
				<h1> {basket?.length} 개의 장바구니 목록이 존재합니다.</h1>
				<div className="payment_content">
					<div className="payment_title">
						<h3>배달 받을 곳</h3>
					</div>
					<div className="payment_address">
						<p>{user?.email} 님의 주소</p>
						<p>서울특별시</p>
						<p>구로구</p>
					</div>
				</div>
			</div>
			<div className="payment_content">
				<div className="payment_title">
					<h3>상품 목록</h3>
				</div>
				<div className="payment_items">
					{basket.map(item => (
						<BasketProduct
							id={item.id}
							title={item.title}
							image={item.image}
							price={item.price}
							rating={item.rating}
						/>
					))}
				</div>
			</div>
			<div className="payment_content">
				<div className="payment_title">
					<h3>결제</h3>
				</div>
				<div className="payment_details">
					<form onSubmit={handleSubmit}>
						<CardElement onChange={handleChange}></CardElement>

						<div className="payment_priceContainer">
							<CurrencyFormat
								renderText={value => (
									<>
										<p>
											총 액({basket.length}개): <strong>{value}원</strong>
										</p>
										<small className="subtotal_gift">
											<input type="checkbox" /> 맞으면 체크해주세요.
										</small>
									</>
								)}
								decimalScale={2} // 소수점 2자리까지
								value={getBasketTotal(basket)} //값
								displayType={"text"} //글자의 형태
								thousandSeparator={true} // 천의 자리마다 단위
								prefix={"₩"}
							/>
						</div>
						{error && <div>{error}</div>}
					</form>
				</div>
			</div>
		</div>
	);
}

export default Payment;
