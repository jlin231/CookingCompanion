import React, { useEffect, useState } from "react";
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

	useEffect(() => {

	}, [errors])

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errorArray = [];
		if (password !== confirmPassword) {
			if (!errorArray.includes("Confirm Password field must be the same as the Password field")) {
				errorArray.push("Confirm Password field must be the same as the Password field")
			}
		}
		if (username.length <= 2) {
			if (!errorArray.includes("Username must be 3 characters or more.")) {
				errorArray.push("Username must be 3 characters or more.")
			}
		}
		if (password.length <= 4) {
			if (!errorArray.includes('Password must be 5 characters or greater.')) {
				errorArray.push('Password must be 5 characters or greater.')
			}
		}
		console.log(errorArray, 'errorArray')
		if (errorArray.length > 0) {
			setErrors(errorArray)
		}
		else {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		}
	};

	return (
		<>
			<h1 className="Global-Modal-Header">Sign Up</h1>
			<form className="Global-ModalForm-Container" onSubmit={handleSubmit}>
				<ul className="Global-Errors-UL">
					{errors.map((error, idx) => {
						return <li key={idx} className="Global-Errors-LI">{error}</li>
					})}
				</ul>
				<label className="Global-Modal-Label">
					<input
						type="email"
						value={email}
						className="Global-Modal-input"
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email address"
						name="email_address"
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
						name="username"
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
						name="password"
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
						name="confirm_password"
					/>
				</label>
				<button type="submit" className="Global-SubmitButton">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
