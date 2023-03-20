import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session);
	const location = useLocation()
	const [query, setQuery] = useState("");
	const history = useHistory()



	if (!sessionUser) {
		return null
	}


	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('print')
		history.push({ 
			pathname: '/recipes/explore',
			query
		   })
		setQuery("")

	}

	return (
		<div className="Navbar">
			<div className="leftNav">
				<div className="HomeButton-Holder">
					<NavLink exact to="/" className="homeNavLink">
						<img src={process.env.PUBLIC_URL + "/cookingCompanion.png"} className="homeImg" />
					</NavLink>
				</div>

				{location.pathname !== '/' && <div className="ExploreButton-Holder">
					<NavLink exact to="/recipes/explore" className="navLinkExplore">
						<div>Explore</div>
					</NavLink>
				</div>}
				{location.pathname !== '/' &&
					<form onSubmit={handleSubmit} className="Search-Form-Container">
						<div className="Search-Input-Container">
							<input
								onChange={(e) => setQuery(e.target.value)}
								value={query}
								placeholder=""
								name="query"
								type="text"
								className="Global-Input-Text"
							/>
							<button type="submit" className="searchButton">
								<i class="fas fa-search fa-1x"></i>
							</button>
						</div>
					</form>
				}
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
