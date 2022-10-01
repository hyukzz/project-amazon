import "./Payment.css";
import { useState } from "react";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import BasketProduct from "./BasketProduct";
import { ShoppingBasket } from "@material-ui/icons";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./Reducer";
import { useEffect } from "react";
import axios from "axios";
import { db } from "./firebase";

function Payment() {
	const navigate = useNavigate();
	const [{ basket, user }, dispatch] = useStateValue();
	const [error, setError] = useState(null);
	const [disable, setDisable] = useState(true); //결제하기 버튼
	const [processing, setProcessing] = useState("");
	const [succeed, setSucceed] = useState(false);
	const [clientSecret, setClientSecret] = useState(true);
	//유저 보안을 위해 사용, 고객의 정보가 확인 됐을 때만 결제를 할 수 있게 한다. useEffect도 사용

	const stripe = useStripe();
	const elements = useElements(true);

	useEffect(() => {
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};
		getClientSecret();
	}, [basket]);

	console.log("client 비밀은 다음과 같아요", clientSecret);

	const handleSubmit = async e => {
		e.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent = payment 확인 및 정보

				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceed(true);
				setError(null);
				setProcessing("");

				// 딜레이가 생겻을때 버튼이 비활성화 된다. 하지만 너무 빨리 넘어가서 확인이 불가능

				dispatch({
					type: "EMPTY_BASKET",
				});

				navigate("/orders");
			});
	};

	const handleChange = e => {
		setDisable(e.empty);
		setError(e.error ? e.error.message : "");
	};
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

							<button disabled={processing || disable || succeed}>
								<span>{processing ? <p>결제중입니다.</p> : "결제하기"}</span>
							</button>
						</div>
						{error && <div>{error}</div>}
					</form>
				</div>
			</div>
		</div>
	);
}

export default Payment;

// import React, { useEffect, useState } from "react";
// import "./Payment.css";
// import BasketProduct from "./BasketProduct";
// import { Link, useNavigate } from "react-router-dom";
// import { useStateValue } from "./StateProvider";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { getBasketTotal } from "./Reducer";
// import CurrecnyFormat from "react-currency-format";
// import axios from "./axios";
// import { db } from "./firebase";

// function Payment() {
// 	const [{ basket, user }, dispatch] = useStateValue();
// 	const navigate = useNavigate();

// 	const stripe = useStripe();
// 	const elements = useElements();

// 	const [succeeded, setSucceeded] = useState(false);
// 	const [processing, setProcessing] = useState("");

// 	const [error, setError] = useState(null);
// 	const [disabled, setDisabled] = useState(true);
// 	const [clientSecret, setClientSecret] = useState(true);

// 	useEffect(() => {
// 		const getClientSecret = async () => {
// 			const response = await axios({
// 				method: "post",
// 				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
// 			});
// 			setClientSecret(response.data.clientSecret);
// 		};

// 		getClientSecret();
// 	}, [basket]);

// 	console.log("client 비밀은 다음과 같아요", clientSecret);

// 	const handleSubmit = async event => {
// 		event.preventDefault();
// 		setProcessing(true);

// 		const payload = await stripe
// 			.confirmCardPayment(clientSecret, {
// 				payment_method: {
// 					card: elements.getElement(CardElement),
// 				},
// 			})
// 			.then(({ paymentIntent }) => {
// 				// paymentIntent = payment 확인 및 정보

// 				db.collection("users")
// 					.doc(user?.uid)
// 					.collection("orders")
// 					.doc(paymentIntent.id)
// 					.set({
// 						basket: basket,
// 						amount: paymentIntent.amount,
// 						created: paymentIntent.created,
// 					});

// 				setSucceeded(true);
// 				setError(null);
// 				setProcessing(false);

// 				// 딜레이가 생겻을때 버튼이 비활성화 된다. 하지만 너무 빨리 넘어가서 확인이 불가능

// 				dispatch({
// 					type: "EMPTY_BASKET",
// 				});

// 				navigate("/orders", { replace: true });
// 			});
// 	};

// 	const handleChange = event => {
// 		setDisabled(event.empty);
// 		setError(event.error ? event.error.message : "");
// 	};

// 	return (
// 		<div className="payment">
// 			<div className="payment_container">
// 				<Link to="/checkout">
// 					<h1>장바구니 다시 설정하기 ({basket?.length} items )</h1>
// 				</Link>

// 				<div className="payment_section">
// 					<div className="payment_title">
// 						<h3> 배달 받을 곳 </h3>
// 					</div>
// 					<div className="payment_address">
// 						<p>{user?.email}</p>
// 						<p>서울특별시</p>
// 						<p>마포구 합정동</p>
// 					</div>
// 				</div>

// 				<div className="payment_section">
// 					<div className="payment_title">
// 						<h3> 리뷰 와 배달 </h3>
// 					</div>
// 					<div className="payment_items">
// 						{basket.map(item => (
// 							<BasketProduct
// 								id={item.id}
// 								title={item.title}
// 								image={item.image}
// 								price={item.price}
// 								rating={item.rating}
// 							/>
// 						))}
// 					</div>
// 				</div>

// 				<div className="payment_section">
// 					<div className="payment_title">
// 						<h3>결제 방법</h3>
// 					</div>
// 					<div className="payment_details">
// 						<form onSubmit={handleSubmit}>
// 							<CardElement onChange={handleChange} />

// 							<div className="payment_priceContainer">
// 								<CurrecnyFormat
// 									renderText={value => <h3> 총액 : {value} 원</h3>}
// 									decimalScale={2}
// 									value={getBasketTotal(basket)}
// 									displayType={"text"}
// 									thousandSeparator={true}
// 									prefix={"₩"}
// 								/>

// 								<button disabled={processing || disabled || succeeded}>
// 									<span>{processing ? <p>처리중</p> : "구매하기"}</span>
// 								</button>
// 							</div>

// 							{error && <div>{error}</div>}
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Payment;
