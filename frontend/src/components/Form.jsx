import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css";

function Form({ route, method }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const name = method === "login" ? "Login" : "Register";

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const res = await api.post(route, { username, password });
			if (method === "login") {
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
				navigate("/");
			} else {
				// If the user is registered, redirect to the login page
				navigate("/login");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<h1>{name}</h1>
			<input
				type="text"
				className="form-input"
				value={username}
				placeholder="Username"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				className="form-input"
				value={password}
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button className="form-button" type="submit">
				{name}
			</button>
		</form>
	);
}

export default Form;
