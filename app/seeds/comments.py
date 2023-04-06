from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    c1 = Comment(
        comment='What a great Recipe!', recipe_id=2, author_id=1)
    c2 = Comment(
        comment='Amazing Recipe!', recipe_id=2, author_id=1)
    c3 = Comment(
        comment='I really enjoyed working with this recipe and I will definetly try it again.', recipe_id=2, author_id=1)
    c4 = Comment(
        comment='I would replace this with less salt but otherwise a great recipe.', recipe_id=2, author_id=1)
    c5 = Comment(
        comment='Not my favorite recipe, but the website works great!', recipe_id=2, author_id=1)
    c6 = Comment(
        comment='Thank you for the time you took to write this recipe!', recipe_id=2, author_id=1)

    db.session.add_all([c1, c2, c3,c4,c5,c6])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
        
    db.session.commit()
