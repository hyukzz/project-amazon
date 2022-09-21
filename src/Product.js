import "./Product.css";
import { useNavigate } from "react-router-dom";

function Product({ id, title, price, rating, image }) {
	// const arr = Array(rating);
	// console.log("arr", arr.fill("index"));
	const navigate = useNavigate();

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
			<button onClick={() => navigate("/basket")}>장바구니에 담기</button>
		</div>
	);
}

export default Product;
