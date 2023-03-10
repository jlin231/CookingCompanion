from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

today = datetime.now()

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(1000), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("recipes.id")), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=today)
    
    recipe = db.relationship("Recipe", back_populates="comments")
    author = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'author': self.author.to_dict(), 
            'createdAt': self.createdAt
        }
