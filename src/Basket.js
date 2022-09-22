import "./Basket.css";
import Subtotal from "./Subtotal";

function Basket() {
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
				</div>
			</div>

			<div className="basket_right">
				<Subtotal />
			</div>
		</div>
	);
}

export default Basket;
