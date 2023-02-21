from app.models import db, Recipe, environment, SCHEMA

def seed_recipes():
    r1 = Recipe(
        title="Pad Krow Pow", 
        description="As dynamic as it is speedy, this ground chicken and green bean recipe from “Night + Market” (Clarkson Potter, 2017) by Kris Yenbamroong and Garrett Snyder, delivers a wallop of flavor with punchy ingredients that stir-fry in just 15 minutes. While this popular Thai street food can be whipped up using a range of proteins, Mr. Yenbamroong refers to his riff as “low-rent” because it’s prepared with ground chicken rather than pricier slices of meat. It’s piled with basil; Thai basil or holy basil provide more assertive licorice notes, but sweet basil adds herbal bursts of brightness. Spiked with Thai seasoning (see Tip), the chicken mixture is salty on its own, but it’s inextricably linked with rice, and imparts the right amount of salinity when dispersed.", 
        author_id=1,
        timeToComplete=30,
        previewImage="https://static01.nyt.com/images/2022/08/29/dining/aw-pad-grapow-gai-1/merlin_212088519_ef79d3f5-7496-448a-8cf4-009939701ed4-master768.jpg?w=1280&q=75",
        instructions="Heat a wok or large nonstick skillet over medium-high, then swirl in the oil. Once the oil is shimmering, add the ground chicken and cook, actively breaking the chicken up into small pieces, until it is mostly cooked, about 6 minutes.Stir in the garlic, sugar and chile until evenly distributed and fragrant, about 2 minutes, then add the green beans, oyster sauce, fish sauce and Thai seasoning, and cook, stirring constantly, until the chicken is fully cooked, the green beans are crisp-tender and the krapow is glossy, about 2 minutes.;Remove from heat, add the basil and a dash of white pepper and toss to combine. If the sauce seems to cling too tightly to the mixture, add 1 to 2 tablespoons of water to make it loose and glossy.;Serve over rice, and top with a crispy fried egg, if desired. Serve with additional Thai seasoning to sprinkle on top, according to taste."
    )

    r2 = Recipe(
        title="Meatloaf", 
        description="This best ever meatloaf recipe lives up to its name and is my favorite I have found. Try it and you will see.", 
        author_id=2,
        timeToComplete=45,
        previewImage="https://www.allrecipes.com/thmb/mKY06P7OC1BDREL8DoSNxCK2vAo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2295590-Best-Ever-Meatloaf-ddmfs-083-4x3-1-6d7604c8b4204abd832a26ef85d0e58e.jpg",
        instructions="Preheat the oven to 350 degrees F (175 degrees C).;Whisk eggs, milk, salt, and ground black pepper in a large bowl. Add crumbled bread and stir until dissolved. Mix ground beef, onion, Cheddar cheese, and carrot into bread mixture; transfer mixture to a 9x5-inch loaf pan. Combine brown sugar, ketchup, and mustard in a small bowl; spread over the meat mixture.;Bake in the preheated oven until no longer pink in the center, 60 to 75 minutes. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C)."
    )

    r3 = Recipe(
        title="S'mores Cookies", 
        description="This copycat recipe for Girl Scout S'mores Cookies can be frosted in different ways - try covering them with chocolate or marshmallow icing, or half and half, or just leave them plain.", 
        author_id=3,
        timeToComplete=35,
        previewImage="https://www.allrecipes.com/thmb/mKY06P7OC1BDREL8DoSNxCK2vAo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2295590-Best-Ever-Meatloaf-ddmfs-083-4x3-1-6d7604c8b4204abd832a26ef85d0e58e.jpg",
        instructions="Stir together 1/3 cup milk, honey, and vanilla extract in a small bowl. In a large bowl, stir together all-purpose flour, brown sugar, whole-wheat flour, baking soda, and salt. Cut in 1/2 cup cold butter, using a pastry blender, until mixture resembles coarse crumbs. Stir in milk mixture just until combined. If needed, knead gently to form a ball. Divide dough into fourths. Wrap each portion in plastic wrap and chill until easy to handle, about 1 hour.;Preheat oven to 350 degrees F (175 degrees C).;On a lightly floured surface, roll 1 portion of dough into a 6-inch square. Cut into 2-inch squares. Arrange 1 inch apart on an ungreased cookie sheet. Prick with a fork. Bake until edges are firm, 7 to 9 minutes. Remove; cool on a wire rack. Repeat with remaining dough.;For marshmallow icing, stir together marshmallow creme, powdered sugar, and 2 Tablespoons butter in a bowl. Stir in enough milk to reach dipping consistency. Dip cookies into icing, allowing excess to drip off. Arrange on wire racks set over wax paper; let stand until set.;For chocolate icing, microwave chocolate and shortening in a small bowl, stirring twice, until smooth, about 90 seconds. Spoon about 1 tablespoon melted chocolate over each cookie to coat. Let stand on a wire rack set over wax paper until set.;For sandwiches: Dip one side of cookie in marshmallow icing. Dip one side of another cookie in chocolate icing; sandwich cookies, icing sides facing in. Let set.;For half and halfs: Dip half the cookie in the marshmallow icing and half in the chocolate icing."
    )

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM recipes")
        
    db.session.commit()
