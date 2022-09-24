import "./Basket.css";
import BasketProduct from "./BasketProduct";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";

function Basket() {
	const [{ basket }, dispatch] = useStateValue();
	//매핑을 해준다. 새로운 배열을 만들어 주는 것
	return (
		<div className="basket">
			<div className="basket_left">
				<img
					className="basket_ad"
					src="https://www.disruptivestatic.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-29-at-11.50.03-AM-450x96.png"
					alt=""
				/>

				<div>
					<h2 className="basket_title">장바구니</h2>
					{
						basket.map(item => (
							<BasketProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))
						/*item에 basket에 정보를 넣어준다.*/
					}
				</div>
			</div>

			<div className="basket_right">
				<Subtotal />
			</div>
		</div>
	);
}

export default Basket;
