from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Recipe, Ingredient, Comment
from .auth_routes import validation_errors_to_error_messages
from ..forms.create_recipe_form import CreateRecipeForm, EditRecipeForm
from ..forms.create_ingredient_form import EditIngredientForm
from ..forms.comment_form import CommentForm

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
        tempRecipe["author"] = tempRecipe["author"].to_dict()
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

#Add an ingredient(s) to a recipe

@recipe_routes.route('/<int:recipeId>/ingredients', methods=['POST'])
@login_required
def add_ingredient(recipeId):
    recipe = Recipe.query.get(recipeId)

    if recipe is None:
      return {
        "message": "Recipe couldn't be found",
        "statusCode": 404
      }, 404

    if recipe.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    data = request.get_json()
    result = []
    errors = []
    print(data, '================>data')
    for ingredient in data["Ingredients"]:
        #validations
        if(len(ingredient["name"]) < 3 or len(ingredient["name"]) > 50):
            print('======================>',ingredient["name"])
            if("Name must be between 3 and 100 characters long" not in errors):
                errors.append("Name must be between 3 and 100 characters long")
        if(ingredient["quantity"] <= 0):
            if("Quantity must be greater than 0" not in errors):
                errors.append("Quantity must be greater than 0")
        if(len(ingredient["unit"]) == 0):
            if("Unit is required" not in errors):
                errors.append("Unit is required")

    if len(errors)>0:
        return {'errors': errors}, 401

    for ingredient in data["Ingredients"]:
        #validations
        newIngredient = Ingredient(
            name = ingredient["name"],
            quantity = ingredient["quantity"],
            unit = ingredient["unit"],
            recipe_id = recipeId
        )

        db.session.add(newIngredient)
        recipe.ingredients.append(newIngredient)
        db.session.commit()
        result.append({
            "id": recipe.ingredients[len(recipe.ingredients)-1].id,
            "quantity": newIngredient.quantity,
            "name": newIngredient.name,
            "unit": newIngredient.unit
        })


    return {
        "Ingredients": result
    }

#Update ingredient

@recipe_routes.route('/<int:recipeId>/ingredients/<int:ingredientId>', methods=["PUT"])
@login_required
def update_ingredient(recipeId, ingredientId):
    #find recipe and ingredient
    print("===================> route hit")
    edit_recipe = db.session.query(Recipe).get(int(recipeId))
    edit_ingredient = db.session.query(Ingredient).get(int(ingredientId))

    if not edit_recipe:
        return {"message": "Recipe couldn't be found"}, 404

    if not edit_ingredient:
        return {"message": "Ingredient couldn't be found"}, 404
 
    if edit_recipe.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    if(edit_ingredient.recipe_id != recipeId):
        return {"message": "Ingredient does not belong to that recipe"}, 404


    form = EditIngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        print('====================>',data)

        edit_ingredient.name = data["name"] 
        edit_ingredient.quantity = data["quantity"] 
        edit_ingredient.unit = data["unit"] 
        print(edit_ingredient.to_dict())
        db.session.commit()


        return {
            "id": edit_ingredient.id,
            "name": edit_ingredient.name,
            "quantity": edit_ingredient.quantity,
            "unit": edit_ingredient.unit,
        }
    #Error handling
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Update/Remove ingredients via list 

@recipe_routes.route('/<int:recipeId>/ingredients', methods=["PUT"])
@login_required
def update_ingredient_list(recipeId):
    #find recipe and ingredient
    print("===================> route hit")
    edit_recipe = db.session.query(Recipe).get(int(recipeId))
    
    if not edit_recipe:
        return {"message": "Recipe couldn't be found"}, 404

    if edit_recipe.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    data = request.get_json()
    #error handling, make sure quantity is positive
    #find ingredients that aren't in the request body and delete them from database
    #Normalize ingredients from the recipe
    request_ingredients = {}
    for ingredient in data["Ingredients"]:
        if(ingredient["quantity"] <= 0):
            return {"errors": ["Quantity must be greater than 0"]}, 404
        request_ingredients[ingredient["id"]] = ingredient

    print(request_ingredients, 'request_ingredients=====================>')
    
    #Check each ingredient associated with recipe and if ingredient id is not found in request ingredients, delete the ingredient from database
    for recipe_ingredient in edit_recipe.ingredients:
        # print('request_ingredients[recipe_ingredient.id]======================>', request_ingredients[recipe_ingredient.id])
        if(recipe_ingredient.id not in request_ingredients):
            db.session.delete(recipe_ingredient)
            db.session.commit()
        else:
            recipe_ingredient.name = request_ingredients[recipe_ingredient.id]["name"]
            recipe_ingredient.quantity = request_ingredients[recipe_ingredient.id]["quantity"]
            recipe_ingredient.unit = request_ingredients[recipe_ingredient.id]["unit"]
    
    db.session.commit()


    return {
        "message": "successfully edited"
    }

#Delete ingredient from recipe
@recipe_routes.route('/<int:recipeId>/ingredients/<int:ingredientId>', methods=['DELETE'])
@login_required
def delete_ingredient(recipeId, ingredientId):
    recipe = db.session.query(Recipe).get(int(recipeId))
    delete_ingredient = db.session.query(Ingredient).get(int(ingredientId))

    if not recipe:
        return {"message": "Recipe couldn't be found"}, 404

    if not delete_ingredient:
        return {"message": "Ingredient couldn't be found"}, 404
 
    if recipe.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    if(delete_ingredient.recipe_id != recipeId):
        return {"message": "Ingredient does not belong to that recipe"}, 404

    db.session.delete(delete_ingredient)    
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200
    }, 200

#Comment routes, 

#Adding a comment to a recipe
@recipe_routes.route('/<int:recipeId>/comments', methods=['POST'])
@login_required
def add_comment(recipeId):
    
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    recipe = db.session.query(Recipe).get(int(recipeId))


    if form.validate_on_submit():
        data = form.data    

        # Create an comment, adding userId and recipeId
        newComment = Comment(
            comment=data["comment"],
            recipe_id=recipeId,
            author_id=current_user.id
        )
        # Add comment to the recipe
        
        
        db.session.add(newComment)
        recipe.comments.append(newComment)
        db.session.commit()

        return newComment.to_dict()


    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Removing a comment

#Editing a comment
