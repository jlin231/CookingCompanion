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

    db.session.add_all([    Ingredient(name='beef shank', quantity=2, unit='pounds', recipe_id=4),    Ingredient(name='beef bones', quantity=1, unit='pound', recipe_id=4),    Ingredient(name='ginger', quantity=2, unit='inches', recipe_id=4),    Ingredient(name='garlic', quantity=6, unit='cloves', recipe_id=4),    Ingredient(name='star anise', quantity=3, unit='pieces', recipe_id=4),    Ingredient(name='cinnamon stick', quantity=1, unit='piece', recipe_id=4),    Ingredient(name='soy sauce', quantity=0.25, unit='cup', recipe_id=4),    Ingredient(name='rice wine', quantity=0.25, unit='cup', recipe_id=4),    Ingredient(name='rock sugar', quantity=2, unit='ounces', recipe_id=4),    Ingredient(name='beef broth', quantity=8, unit='cups', recipe_id=4),    Ingredient(name='dried Chinese noodles', quantity=1, unit='pound', recipe_id=4),    Ingredient(name='bok choy', quantity=4, unit='ounces', recipe_id=4),    Ingredient(name='green onions', quantity=4, unit='stalks', recipe_id=4),    Ingredient(name='cilantro', quantity=0.25, unit='cup', recipe_id=4),    Ingredient(name='lime', quantity=1, unit='piece', recipe_id=4)]); 

    db.session.add_all([
        Ingredient(name='broccoli', quantity=1, unit='head', recipe_id=5),
        Ingredient(name='carrots', quantity=3, unit='pieces', recipe_id=5),
        Ingredient(name='red bell pepper', quantity=1, unit='piece', recipe_id=5),
        Ingredient(name='olive oil', quantity=2, unit='tablespoons', recipe_id=5),
        Ingredient(name='garlic', quantity=3, unit='cloves', recipe_id=5),
        Ingredient(name='soy sauce', quantity=1, unit='tablespoon', recipe_id=5),
        Ingredient(name='honey', quantity=1, unit='tablespoon', recipe_id=5),
    ])

    db.session.add_all([
        Ingredient(name='all-purpose flour', quantity=2, unit='cups', recipe_id=6),
        Ingredient(name='baking powder', quantity=2, unit='teaspoons', recipe_id=6),
        Ingredient(name='baking soda', quantity=1, unit='teaspoon', recipe_id=6),
        Ingredient(name='salt', quantity=0.5, unit='teaspoon', recipe_id=6),
        Ingredient(name='unsalted butter', quantity=0.5, unit='cup', recipe_id=6),
        Ingredient(name='granulated sugar', quantity=1, unit='cup', recipe_id=6),
        Ingredient(name='large egg', quantity=2, unit='pieces', recipe_id=6),
        Ingredient(name='plain Greek yogurt', quantity=1, unit='cup', recipe_id=6),
        Ingredient(name='vanilla extract', quantity=1, unit='teaspoon', recipe_id=6),
        Ingredient(name='fresh blueberries', quantity=1, unit='cup', recipe_id=6),
    ])

    db.session.add_all([
        Ingredient(name='tortilla chips', quantity=8, unit='ounces', recipe_id=7),
        Ingredient(name='ground beef', quantity=0.5, unit='pound', recipe_id=7),
        Ingredient(name='taco seasoning', quantity=2, unit='tablespoons', recipe_id=7),
        Ingredient(name='shredded cheddar cheese', quantity=1, unit='cup', recipe_id=7),
        Ingredient(name='diced tomatoes', quantity=0.5, unit='cup', recipe_id=7),
        Ingredient(name='sliced jalapenos', quantity=1/4, unit='cup', recipe_id=7),
        Ingredient(name='sour cream', quantity=1/4, unit='cup', recipe_id=7),
        Ingredient(name='sliced black olives', quantity=1/4, unit='cup', recipe_id=7),
    ])

    db.session.add_all([
        Ingredient(name='bread slices', quantity=2, unit='pieces', recipe_id=8),
        Ingredient(name='peanut butter', quantity=2, unit='tablespoons', recipe_id=8),
        Ingredient(name='jelly or jam', quantity=2, unit='tablespoons', recipe_id=8),
    ])

    db.session.add_all([
        Ingredient(name='spaghetti', quantity=1, unit='pound', recipe_id=9),
        Ingredient(name='ground beef', quantity=1, unit='pound', recipe_id=9),
        Ingredient(name='breadcrumbs', quantity=1/2, unit='cup', recipe_id=9),
        Ingredient(name='grated Parmesan cheese', quantity=1/2, unit='cup', recipe_id=9),
        Ingredient(name='egg', quantity=1, unit='piece', recipe_id=9),
        Ingredient(name='chopped parsley', quantity=2, unit='tablespoons', recipe_id=9),
        Ingredient(name='garlic', quantity=2, unit='cloves', recipe_id=9),
        Ingredient(name='salt', quantity=1/2, unit='teaspoon', recipe_id=9),
        Ingredient(name='black pepper', quantity=1/4, unit='teaspoon', recipe_id=9),
        Ingredient(name='olive oil', quantity=2, unit='tablespoons', recipe_id=9),
        Ingredient(name='canned tomatoes', quantity=28, unit='ounces', recipe_id=9),
        Ingredient(name='fresh basil leaves', quantity=5, unit='pieces', recipe_id=9),
    ])

    db.session.add_all([  # Recipe 1: Japanese Miso Soup
        Ingredient(name='miso paste', quantity=2, unit='tbsp', recipe_id=10),
        Ingredient(name='dashi stock', quantity=4, unit='cups', recipe_id=10),
        Ingredient(name='tofu', quantity=200, unit='g', recipe_id=10),
        Ingredient(name='wakame seaweed', quantity=30, unit='g', recipe_id=10),
        Ingredient(name='spring onion', quantity=2, unit='stalks', recipe_id=10),
        Ingredient(name='enoki mushrooms', quantity=100, unit='g', recipe_id=10),
        Ingredient(name='mirin', quantity=1, unit='tbsp', recipe_id=10),
        
        # Recipe 2: Thai Green Curry
        Ingredient(name='green curry paste', quantity=2, unit='tbsp', recipe_id=11),
        Ingredient(name='coconut milk', quantity=400, unit='ml', recipe_id=11),
        Ingredient(name='chicken breast', quantity=400, unit='g', recipe_id=11),
        Ingredient(name='bamboo shoots', quantity=100, unit='g', recipe_id=11),
        Ingredient(name='Thai basil', quantity=1, unit='cup', recipe_id=11),
        Ingredient(name='sugar', quantity=2, unit='tsp', recipe_id=11),
        Ingredient(name='fish sauce', quantity=1, unit='tbsp', recipe_id=11),
        
        # Recipe 3: Korean Bibimbap
        Ingredient(name='rice', quantity=2, unit='cups', recipe_id=12),
        Ingredient(name='beef sirloin', quantity=250, unit='g', recipe_id=12),
        Ingredient(name='carrots', quantity=1, unit='medium', recipe_id=12),
        Ingredient(name='spinach', quantity=100, unit='g', recipe_id=12),
        Ingredient(name='shiitake mushrooms', quantity=100, unit='g', recipe_id=12),
        Ingredient(name='zucchini', quantity=1, unit='medium', recipe_id=12),
        Ingredient(name='eggs', quantity=2, unit='', recipe_id=12),
        
        # Recipe 4: Chinese Stir-Fried Vegetables
        Ingredient(name='bok choy', quantity=2, unit='stalks', recipe_id=13),
        Ingredient(name='carrots', quantity=1, unit='medium', recipe_id=13),
        Ingredient(name='mushrooms', quantity=100, unit='g', recipe_id=13),
        Ingredient(name='red bell pepper', quantity=1, unit='', recipe_id=13),
        Ingredient(name='garlic', quantity=2, unit='cloves', recipe_id=13),
        Ingredient(name='soy sauce', quantity=1, unit='tbsp', recipe_id=13),
        Ingredient(name='sesame oil', quantity=1, unit='tbsp', recipe_id=13),
        
        # Recipe 5: Vietnamese Pho
        Ingredient(name='beef bones', quantity=1.5, unit='kg', recipe_id=14),
        Ingredient(name='star anise', quantity=4, unit='', recipe_id=14),
        Ingredient(name='cinnamon stick', quantity=1, unit='', recipe_id=14),
        Ingredient(name='ginger', quantity=30, unit='g', recipe_id=14),
    ])

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
