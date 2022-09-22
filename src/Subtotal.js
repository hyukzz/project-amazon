import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";

function Subtotal() {
	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={value => (
					<>
						<p>
							총 액(0 items): <strong>0원</strong>
						</p>
						<small className="subtotal_gift">
							<input type="checkbox" /> 맞으면 체크해주세요.
						</small>
					</>
				)}
				decimalScale={2} // 소수점 2자리까지
				value={0} //값
				displayType={"text"} //글자의 형태
				thousandSeparator={true} // 천의 자리마다 단위
				prefix={"₩"}
			/>
			<button>결제</button>
		</div>
	);
}

export default Subtotal;
