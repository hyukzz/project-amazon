import { useEffect, useState } from "react";
import "./Payment.css";
import BasketProduct from "./BasketProduct";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./Reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "./firebase";
import { ShoppingBasket } from "@material-ui/icons";

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const navigate = useNavigate();

	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");

	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

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

	const handleSubmit = async event => {
		event.preventDefault();
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

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				// 딜레이가 생겻을때 버튼이 비활성화 된다. 하지만 너무 빨리 넘어가서 확인이 불가능

				dispatch({
					type: "EMPTY_BASKET",
				});

				navigate("/orders", { replace: true });
			});
	};

	const handleChange = event => {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
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
				<div className="payment_content">
					<div className="payment_title">
						<h3> 배달 받을 곳 </h3>
					</div>
					<div className="payment_address">
						<p>{user?.email}</p>
						<p>서울특별시</p>
						<p>마포구 합정동</p>
					</div>
				</div>

				<div className="payment_content">
					<div className="payment_title">
						<h3> 리뷰 와 배달 </h3>
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
						<h3>결제 방법</h3>
					</div>
					<div className="payment_details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className="payment_priceContainer">
								<CurrencyFormat
									renderText={value => <h3> 총액 : {value} 원</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"₩"}
								/>

								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>처리중</p> : "구매하기"}</span>
								</button>
							</div>

							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
