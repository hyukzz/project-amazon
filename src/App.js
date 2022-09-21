import Header from "./Header";
import Home from "./Home";
// import Basket from "./Basket";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
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

				<Route
					path="/basket"
					element={
						<>
							<Header />
							{/* <Basket /> */}
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
