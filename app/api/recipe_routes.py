from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Recipe, Ingredient
from .auth_routes import validation_errors_to_error_messages
from ..forms.create_recipe_form import CreateRecipeForm, EditRecipeForm

recipe_routes = Blueprint('album', __name__)


#Return all recipes
@recipe_routes.route('/')
def get_all_recipes():
    all_recipes = Recipe.query.all()
    output = {
        "Recipes":[]
    }

    for recipe in all_recipes:
        tempRecipe = recipe.to_dict()
        tempRecipe.pop("author")
        tempRecipe.pop("ingredients")
        output["Recipes"].append(tempRecipe)

    return output

#return single recipe
@recipe_routes.route('/<int:recipeId>')
def get_single_recipe(recipeId):
    single_recipe = db.session.query(Recipe).get(int(recipeId))

    #pull ingredients info out albums
    ingredientInfo = []
    for ingredient in single_recipe.ingredients:
        tempIngredient = ingredient.to_dict()
        tempIngredient.pop("recipe")
        tempIngredient.pop("recipe_id")
        ingredientInfo.append(tempIngredient)

    #pull author info
    tempAuthor = single_recipe.author.to_dict() 
    print("===========================>", tempAuthor)

    return {
        "id": single_recipe.id,
        "title" : single_recipe.title,
        "description": single_recipe.description,
        "author_id": single_recipe.author_id,
        "timeToComplete": single_recipe.timeToComplete,
        "previewImage": single_recipe.previewImage,
        "instructions": single_recipe.instructions,
        "createdAt": single_recipe.createdAt,
        "author": tempAuthor,        
        "ingredients": ingredientInfo
    }

#Create a recipe
@recipe_routes.route('/', methods=["POST"])
@login_required
def create_recipe():
  user_id = current_user.id
  form = CreateRecipeForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data

    newRecipe = Recipe(
        title=data["title"],
        description=data["description"],
        timeToComplete=data["timeToComplete"],
        previewImage=data["previewImage"],
        instructions=data["instructions"],
        author_id = user_id
    )   

    db.session.add(newRecipe)
    db.session.commit()

    return {
        "id": newRecipe.id,
        "title" : newRecipe.title,
        "description": newRecipe.description,
        "author_id": newRecipe.author_id,
        "timeToComplete": newRecipe.timeToComplete,
        "previewImage": newRecipe.previewImage,
        "instructions": newRecipe.instructions,
        "createdAt": newRecipe.createdAt,
    }
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Update a recipe
@recipe_routes.route('/<int:recipeId>', methods=['PUT'])
@login_required
def update_to_album(recipeId):
    #Check if current user is owner of recipe
    data = request.get_json()
    
    #find recipe
    edit_Recipe = db.session.query(Recipe).get(recipeId)

    if edit_Recipe.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    form = EditRecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        edit_Recipe.title = data["title"]
        edit_Recipe.description = data["description"]
        edit_Recipe.timeToComplete = data["timeToComplete"]
        edit_Recipe.previewImage = data["previewImage"]
        edit_Recipe.instructions = data['instructions']
        
        db.session.commit()


        return {
            "id": edit_Recipe.id,
            "author_id": edit_Recipe.author_id,
            "title": data["title"],
            "description": data["description"],
            "timeToComplete": data["timeToComplete"],
            "previewImage": data["previewImage"],
            "instructions": data["instructions"],
            "createdAt": edit_Recipe.createdAt
        }

    db.session.commit()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Delete a recipe
@recipe_routes.route('/<int:recipeId>', methods=["DELETE"])
@login_required
def delete_recipe(recipeId):
    recipe = db.session.query(Recipe).get(recipeId)

    if recipe is None:
        return {
            "message": "Recipe couldn't be found",
            "statusCode": 404
        }, 404

    if recipe.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    if recipe is not None:
        db.session.delete(recipe)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "statusCode": 200
        }, 200
