import "../styles/Product.css";

import { useStateValue } from "../stores/StateProvider";

function Product({ id, title, price, rating, image }) {
	// const arr = Array(rating);
	// console.log("arr", arr.fill("index"));

	const [{ basket }, dispatch] = useStateValue();
	//basket은 basket 정보를 가져오는 것 dispatch는 데이터를 보내는 것

	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
				//action.item으로 값을 넣어주는 것
				//좌측 값은 명목, 우측 값은 데이터들
			},
		});
	};
	// console.log("basket", basket);
	return (
		<div className="product">
			<div className="product_info">
				<p>{title}</p>

				<p className="product_price">
					<small>가격</small>
					<strong>{price}</strong>
					<small>원</small>
				</p>

				<div className="product_rating">
					{
						Array(rating)
							.fill()
							.map(() => (
								<p>★</p>
							))
						/* 
            0.rating 안의 크기만큼 Array가 생성된다.
            1.배열을 만든다. 
            => []
            2.fill로 배열을 채운다. 
            => [undefined, undefined, undefined, undefined, undefined]
            3.map으로 별을 갯수만큼 찍어낸다.
            => [★, ★, ★, ★, ★]
            p.s 개수이기 떄문에 소수점은 안된다.
            */
					}
				</div>
			</div>

			<img src={image} alt="" />
			<button onClick={addToBasket}>장바구니에 담기</button>
		</div>
	);
}

export default Product;
