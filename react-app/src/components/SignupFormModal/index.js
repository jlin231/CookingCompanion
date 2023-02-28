import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1 className="Global-Modal-Header">Sign Up</h1>
			<form className="Global-ModalForm-Container" onSubmit={handleSubmit}>
				<ul className="Global-Errors-UL">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="Global-Modal-Label">
					<input
						type="text"
						value={email}
						className="Global-Modal-input"
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email address"
					/>
				</label>
				<label className="Global-Modal-Label">
					<input
						type="text"
						value={username}
						className="Global-Modal-input"
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
					/>
				</label>
				<label className="Global-Modal-Label">
					<input
						type="password"
						value={password}
						className="Global-Modal-input"
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</label>
				<label className="Global-Modal-Label">
					<input
						type="password"
						value={confirmPassword}
						className="Global-Modal-input"
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
					/>
				</label>
				<button type="submit" className="Global-SubmitButton">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
