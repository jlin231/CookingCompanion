import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session);
	const location = useLocation()

	if (!sessionUser) {
		return null
	}

	return (
		<div className="Navbar">
			<div className="leftNav">
				<div className="HomeButton-Holder">
					<NavLink exact to="/" className="homeNavLink">
						<img src={process.env.PUBLIC_URL + "/cookingCompanion.png"} className="homeImg" />
					</NavLink>
				</div>
				<div className="ExploreButton-Holder">
					<NavLink exact to="/recipes/explore" className="navLinkExplore">
						<div>Explore</div>
					</NavLink>
				</div>
			</div>
			<div className="rightNav">
				{isLoaded && sessionUser.user && (
					<div className="CreateButton-Holder">
						<NavLink exact to='/create/recipes' className="navLinkCreate">
							<div>Create a Recipe</div>
						</NavLink>
					</div>
				)}
				{isLoaded && sessionUser.user && (
					<ProfileButton user={sessionUser.user} />
				)}
				{!sessionUser.user && (
					<div className="Login-Signup-Holder">
						<OpenModalButton
							buttonText="Log In"
							className="login"
							modalComponent={<LoginFormModal />}
						/>
						<OpenModalButton
							buttonText="Sign Up"
							className="signup cleanButton"
							modalComponent={<SignupFormModal />}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
