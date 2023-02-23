from app.models import db, Ingredient, environment, SCHEMA

i1 = Ingredient(
    name='vegetable oil', quantity=0.25, unit='cup', recipe_id=1)
i2 = Ingredient(
    name='ground chicken', quantity=1, unit='lb', recipe_id=1)
i3 = Ingredient(
    name='granulated sugar', quantity=2, unit='tsp', recipe_id=1)
i4 = Ingredient(
    name='green beans', quantity=8, unit='ounces', recipe_id=1)
i5 = Ingredient(
    name='soy sauce', quantity=3, unit='tsp', recipe_id=1)
i6 = Ingredient(
    name='milk', quantity=0.33, unit='cup', recipe_id=3)
i7 = Ingredient(
    name='vanilla extract', quantity=1, unit='tsp', recipe_id=3)
i8 = Ingredient(
    name='cold butter', quantity=0.5, unit='cup', recipe_id=3)
i9 = Ingredient(
    name='milk chocolate', quantity=12, unit='ounces', recipe_id=3)
i10 = Ingredient(
    name='baking soda', quantity=1, unit='tsp', recipe_id=3)
i11 = Ingredient(
    name='milk', quantity=0.66, unit='cup', recipe_id=2)
i12 = Ingredient(
    name='bread', quantity=3, unit='slices', recipe_id=2)
i13 = Ingredient(
    name='ground beef', quantity=1.5, unit='cup', recipe_id=2)
i14 = Ingredient(
    name='cheddar cheese', quantity=1, unit='cup', recipe_id=2)
i15 = Ingredient(
    name='ketchup', quantity=0.25, unit='cup', recipe_id=2)

def seed_ingredients():

    db.session.add_all([i11, i12, i13, i14, i15])
    db.session.add_all([i1, i2, i3, i4, i5])
    db.session.add_all([i6, i7, i8, i9, i10])
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
