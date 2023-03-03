import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoLogin = () => {
    dispatch(login("demo@aa.io", "password"));
    closeModal();
    return history.push("/recipes");
  };



  return (
    <>
      <h1 className="Global-Modal-Header">Log In</h1>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL ">
          {errors.map((error, idx) => {
            error = error.split(':')[1]
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
        </label >
        <button type="submit" className="Global-SubmitButton">Log In</button>
      </form>
      <div onClick={demoLogin} className="Login-Demo">
        Try demo
      </div>
    </>
  );
}

export default LoginFormModal;
