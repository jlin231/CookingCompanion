from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

today = datetime.now()

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    timeToComplete = db.Column(db.Integer, nullable=False)
    previewImage = db.Column(db.String(1000), nullable=False)
    instructions = db.Column(db.String(2000), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=today)

    author = db.relationship("User", back_populates="recipes")
    ingredients = db.relationship("Ingredient", cascade="all, delete-orphan", back_populates="recipe")
    comments = db.relationship("Comment", back_populates="recipe")

    #Many-To-Many betweeen Collections and Recipes
    collections = db.relationship(
        "Collection",
        secondary="collection_recipes",
        back_populates="recipes"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'author_id': self.author_id,
            'timeToComplete': self.timeToComplete,
            'previewImage': self.previewImage,
            'instructions': self.instructions,
            'createdAt': self.createdAt,
            'author': self.author,
            'ingredients': self.ingredients
        }
    
    def collection_info(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'timeToComplete': self.timeToComplete,
            'previewImage': self.previewImage,
            'author': self.author,
        }
