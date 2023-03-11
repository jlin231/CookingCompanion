from .db import db, environment, SCHEMA, add_prefix_for_prod


class Collection(db.Model):
    __tablename__ = 'collections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # #One-To-Many between Collection and User
    # author = db.relationship("User", back_populates="collections")

    # #Many-To-Many betweeen Collections and Recipes
    # recipes = db.relationship(
    #     "Recipe",
    #     secondary="collection_recipes",
    #     back_populates="collections"
    # )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'unit': self.unit,
            'recipe_id': self.recipe_id,
            'recipe': self.recipe
        }
    
collection_recipes = db.Table(
    "collection_recipes",
    db.Column(
        "recipe_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("recipes.id")),
        primary_key=True
    ),
    db.Column(
        "collection_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("collections.id")),
        primary_key=True
    )
)

if environment == "production":
    collection_recipes.schema = SCHEMA
