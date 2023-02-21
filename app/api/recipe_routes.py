from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Recipe, Ingredient
from .auth_routes import validation_errors_to_error_messages


recipe_routes = Blueprint('album', __name__)


#Return all albums
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

# #return single albums
# @recipe_routes.route('/<int:albumId>')
# def get_single_album(albumId):
#     single_album = db.session.query(Album).get(int(albumId))

#     #pull photo info out albums
#     photoInfo = []
#     for photo in single_album.photos:
#         tempPhoto = photo.to_dict()
#         tempPhoto.pop("user")
#         tempPhoto.pop("comments")
#         tempPhoto.pop("albums")
#         tempPhoto.pop("tags")
#         photoInfo.append(tempPhoto)

#     return {
#         "id": single_album.id,
#         "album_name" : single_album.album_name,
#         "photos": photoInfo
#     }

# @recipe_routes.route('/', methods=["POST"])
# @login_required
# def create_album():
#   user_id = current_user.id
#   form = CreateAlbumForm()
#   form['csrf_token'].data = request.cookies['csrf_token']


#   if form.validate_on_submit():
#     data = form.data

#     newAlbum = Album(
#         album_name= data["album_name"],
#         user_id = current_user.id
#     )

#     db.session.add(newAlbum)
#     db.session.commit()

#     allAlbums = Album.query.all()

#     return {
#         "id": allAlbums[len(allAlbums)-1].id,
#         "album_name": newAlbum.album_name,
#         "photos": [],
#         "user_id":user_id
#     }
#   return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# @recipe_routes.route('/<int:albumId>', methods=['PUT'])
# @login_required
# def add_photo_to_album(albumId):
#     #Check if current user is owner of album and owner of photoId
#     data = request.get_json()
#     photoId = data["photoId"]

#     singlePhoto = db.session.query(Photo).get(photoId)
#     singleAlbum = db.session.query(Album).get(albumId)

#     if singlePhoto is None:
#         return {
#             "message": "Photo couldn't be found",
#             "statusCode": 404
#         }, 404

#     if singleAlbum.user_id != current_user.id:
#         return {'errors': ['Unauthorized']}, 401

#     if current_user.id != singlePhoto.user_id:
#         return {'errors': ['Unauthorized']}, 401

#     #execute update
#     singleAlbum.photos.append(singlePhoto)
#     db.session.commit()

#     return {
#         "message": "successfully added"
#     }


# @recipe_routes.route('/<int:albumId>', methods=["DELETE"])
# @login_required
# def delete_album(albumId):
#     album = db.session.query(Album).get(albumId)

#     if album is None:
#         return {
#             "message": "Comment couldn't be found",
#             "statusCode": 404
#         }, 404

#     if album.user_id != current_user.id:
#         return {'errors': ['Unauthorized']}, 401

#     if album is not None:
#         db.session.delete(album)
#         db.session.commit()
#         return {
#             "message": "Successfully deleted",
#             "statusCode": 200
#         }, 200
