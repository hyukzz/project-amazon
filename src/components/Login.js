import "../styles/Login.css";

import { auth } from "../stores/firebase";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const signIn = e => {
		e.preventDefault(); //새로고침 방지
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				navigate("/");
			})
			.catch(err => {
				alert(err.message);
			});
	};
	const signUp = e => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(auth => {
				if (auth) {
					navigate("/");
				}
			})
			.catch(err => {
				alert(err.message);
			});
	};
	return (
		<div className="login">
			<Link to="/">
				<img
					className="login_logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2880px-Amazon_logo.svg.png"
					alt=""
				/>
			</Link>
			<div className="login_container">
				<h1>로그인</h1>
				<form>
					<h5>e-mail</h5>
					<input
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
						type="text"
					/>
					<h5>password</h5>
					<input
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
						type="password"
					/>
					<button onClick={signIn} className="login_signInButton">
						로그인
					</button>
				</form>

				<p>이용 약관에 동의하시겠습니까?</p>

				<button onClick={signUp} className="login_signUpButton">
					회원가입
				</button>
			</div>
		</div>
	);
}

export default Login;
