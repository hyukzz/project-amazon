import "../styles/Subtotal.css";

import { useStateValue } from "../stores/StateProvider";
import { getBasketTotal } from "../stores/Reducer";

import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

function Subtotal() {
	const [{ basket }, dispatch] = useStateValue();
	const navigate = useNavigate();

	return (
		<div className="subtotal">
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
			<button onClick={() => navigate("/payment")}>결제</button>
		</div>
	);
}

export default Subtotal;
