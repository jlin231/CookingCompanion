from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Recipe, Collection
from .auth_routes import validation_errors_to_error_messages
from ..forms.collection_form import CollectionForm

collection_routes = Blueprint('collections', __name__)
#Return all collections
@collection_routes.route('/')
def get_all_collections():
    all_collections = Collection.query.all()
    output = {
        "Collection":[]
    }

    for collection in all_collections:
        tempCollection = collection.to_dict()
        print(tempCollection, '========================>')
        tempCollection["author"] = tempCollection["author"].to_dict()
        if(tempCollection["recipes"] and len(tempCollection["recipes"])>0):
            tempCollection["imageUrl"] = tempCollection["recipes"][0].previewImage
        tempCollection.pop("recipes")
        output["Collection"].append(tempCollection)

    return output

#return single collections
@collection_routes.route('/<int:collectionId>')
def get_single_collections(collectionId):
    single_collection = db.session.query(Collection).get(int(collectionId))

    #pull recipe info out collection
    recipeInfo = []
    for recipe in single_collection.recipes:
        tempRecipe = recipe.collection_info()
        tempRecipe["author"] = recipe.author.to_dict()
        recipeInfo.append(tempRecipe)

    #pull author info
    tempAuthor = single_collection.author.to_dict() 
    print("===========================>", tempAuthor)
    
    return {
        "id": single_collection.id,
        "name" : single_collection.name,
        "description": single_collection.description,
        "author": tempAuthor,        
        "recipes": recipeInfo
    }


#Create a recipe
@collection_routes.route('/', methods=["POST"])
@login_required
def create_collection():
  user_id = current_user.id
  form = CollectionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
    
  if form.validate_on_submit():
    data = form.data

    newCollection = Collection(
        name=data["name"],
        description=data["description"],
        author_id = user_id
    )   

    db.session.add(newCollection)
    db.session.commit()

    return {
        "id": newCollection.id,
        "name" : newCollection.name,
        "description": newCollection.description,
        "author": newCollection.author.to_dict(),
    }
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Update a recipe
@collection_routes.route('/<int:collectionId>', methods=['PUT'])
@login_required
def update_to_album(collectionId):
    #Check if current user is owner of recipe
    data = request.get_json()
    
    #find recipe
    edit_Collection = db.session.query(Collection).get(collectionId)

    if edit_Collection is None:
            return {
                "message": "Collection couldn't be found",
                "statusCode": 404
            }, 404


    if edit_Collection.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        edit_Collection.name = data["name"]
        edit_Collection.description = data["description"]
        db.session.commit()

        return {
            "id": edit_Collection.id,
            "author_id": edit_Collection.author_id,
            "name": edit_Collection.name,
            "description": edit_Collection.description
        }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Delete a collection
@collection_routes.route('/<int:collectionId>', methods=["DELETE"])
@login_required
def delete_recipe(collectionId):
    collection = db.session.query(Collection).get(collectionId)

    if collection is None:
        return {
            "message": "Collection couldn't be found",
            "statusCode": 404
        }, 404

    if collection.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    if collection is not None:
        db.session.delete(collection)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "statusCode": 200
        }, 200

#Delete a recipe from a collection
@collection_routes.route('/<int:collectionId>/recipe/<int:recipeId>', methods=["DELETE"])
@login_required
def delete_recipe_collection(collectionId, recipeId):

    recipe = db.session.query(Recipe).get(int(recipeId))
    collection = db.session.query(Collection).get(int(collectionId))

    if not recipe:
        return {"message": "Recipe couldn't be found"}, 404

    if not collection:
        return {"message": "Collection couldn't be found"}, 404
    
    if collection.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    index = 0; 
    for recipe in collection.recipes:
        if(recipe.id == recipeId):
            collection.recipes.pop(index)
            break
        print('===================>',collection.recipes)
        index = index+1; 

    db.session.commit()

    return {
            "message": "Successfully deleted",
            "statusCode": 200
        }, 200
#Add a list of recipes from a collection
@collection_routes.route('/<int:collectionId>/recipe', methods=["POST"])
@login_required
def add_recipe_collection(collectionId):
    data = request.get_json()

    collection = db.session.query(Collection).get(int(collectionId))

    if collection.author_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    print('===============================>',data)

    if not collection:
        return {"message": "Collection couldn't be found"}, 404
    
    for recipe in data['recipes']:
        tempRecipe= db.session.query(Recipe).get(int(recipe["id"]))
        collection.recipes.append(tempRecipe)

    db.session.commit()

    return {
        "name": collection.name,
        "description": collection.description,
        "recipeIds": [recipe.id for recipe in collection.recipes]
    }, 200
