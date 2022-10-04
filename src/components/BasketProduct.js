import "../styles/BasketProduct.css";

import { useStateValue } from "../stores/StateProvider";

function BasketProduct({ id, title, price, rating, image, hideButton }) {
	const [{ basket }, dispatch] = useStateValue();

	const removeFromBasket = () => {
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
	};
	return (
		<div className="basketProduct">
			<img className="basketProduct_image" src={image} alt="" />

			<div className="basketProduct_info">
				<p className="basketProduct_title">{title}</p>
				<p className="basketProduct_price">
					<small>₩</small>
					<strong>{price}</strong>
					<small>원</small>
				</p>

				<div className="basketProduct_rating">
					{Array(rating)
						.fill()
						.map(() => (
							<p>★</p>
						))}
				</div>
				{!hideButton && (
					<button onClick={removeFromBasket}>장바구니에서 제거하기</button>
				)}
			</div>
		</div>
	);
}

export default BasketProduct;
