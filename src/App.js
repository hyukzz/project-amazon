import Header from "./components/Header";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import Login from "./components/Login";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import { auth } from "./stores/firebase";
import { useStateValue } from "./stores/StateProvider";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"pk_test_51LmvqNJfTBlMq57IucczObbj2iJBf9OcgYm6s9I8mcwMFLjZLX3ITLMfuzrmrY9VlTuU5sZ1tktyZPEE2KQJ8kN0008nK3bEF0"
);

function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged(authUser => {
			// console.log("사용자", authUser);
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
					/*SET_USER, user을 전달했다. 이는 action이다. */
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);
	/*
	로그인했는지 로그아웃 했는지 확인 가능할 수 있게 useEffect로 동기화한다.

	deps가 보통 3가지 경우로 있다.
	1. deps 가 없을 때 
	=> 변화가 있을 때마다 계속 실행
	2. deps가 []일 때
	=> 한 번만 실행
	3. deps에 []안에 요소가 있을 때
	=> 요소가 바뀔 때 실행
	*/
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Header />
							<Home />
						</>
					}
				/>

				<Route path="/login" element={<Login />} />

				<Route
					path="/basket"
					element={
						<>
							<Header />
							<Basket />
						</>
					}
				/>

				<Route
					path="/payment"
					element={
						<>
							<Header />
							<Elements stripe={promise}>
								<Payment />
							</Elements>
						</>
					}
				/>

				<Route
					path="/order"
					element={
						<>
							<Header />
							<Orders />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
