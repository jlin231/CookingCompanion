from app.models import db, Ingredient, environment, SCHEMA

def seed_ingredients():
    g1 = Ingredient(
        name='Sugar', quantity=2, unit='teaspoons', recipe_id=1)


    db.session.add(g1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM ingredients")
        
    db.session.commit()