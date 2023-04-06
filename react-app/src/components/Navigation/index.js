import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import { thunkGetAllRecipe } from '../../store/recipe';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session);
	const location = useLocation()
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([])
	const history = useHistory()
	const dispatch = useDispatch();
	const allRecipes = useSelector((state) => state.recipes.allRecipes)

	useEffect(() => {
		setQuery("");
		setSearchResults([]);
		dispatch(thunkGetAllRecipe());

		return () => {
			setQuery("")
			setSearchResults([])
		}
	}, [dispatch]);

	if (!sessionUser || !allRecipes) {
		console.log("nothing on initial render")
		return null
	}

	let recipeValues = Object.values(allRecipes)

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('print')
		history.push({
			pathname: '/recipes/explore',
			query
		})
		setQuery("")
		setSearchResults([])
	}

	const handleQueryChange = (e) => {
		const result = recipeValues.filter((recipe) => {
			return ((recipe.description.toLowerCase()).includes(e.target.value) ||
				(recipe.title.toLowerCase()).includes(e.target.value) ||
				(recipe.instructions.toLowerCase()).includes(e.target.value))
		})
		setQuery(e.target.value)
		setSearchResults(result)
	}

	const searchDropDownClassName = "searchDropDown" + ((searchResults.length > 0 && query.length != 0) ? "" : " hidden");
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
							<div className='search-Container'>
								<input
									onChange={handleQueryChange}
									value={query}
									placeholder="Search for Recipes here!"
									name="query"
									type="text"
									className="Search-Input-Text"
								/>
								<div className={searchDropDownClassName}>
									{searchResults.map((recipe) => {
										return (
											<div className="dropDownNavDiv" key={recipe.id} onClick={(e) => {
												e.preventDefault()
												setQuery("")
												setSearchResults([])
												history.push(`/recipes/${recipe.id}`)
											}
											}>
												<img className='dropDownImage' src={recipe.previewImage} />
												<div className='dropDownTitle'>{recipe.title}</div>
											</div>


										)
									})}
								</div>
							</div>
							<button type="submit" className="searchButton">
								<i class="fas fa-search fa-1x"></i>
							</button>
						</div>

					</form>
				}
			</div>
			<div className="rightNav">
				{isLoaded && sessionUser.user && (
					<>
						<div className="CreateButton-Holder">
							<NavLink exact to='/create/recipes' className="navLinkCreate">
								<div >Create Recipe</div>
							</NavLink>
						</div>
						<div className="CreateButton-Holder">
							<NavLink exact to='/collections/create' className="navLinkCreate">
								<div >Create Collection</div>
							</NavLink>
						</div>
					</>
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
