from app.models import db, Recipe, environment, SCHEMA

def seed_recipes():
    r1 = Recipe(
        title="Pad Krow Pow", 
        description="As dynamic as it is speedy, this ground chicken and green bean recipe from “Night + Market” (Clarkson Potter, 2017) by Kris Yenbamroong and Garrett Snyder, delivers a wallop of flavor with punchy ingredients that stir-fry in just 15 minutes. While this popular Thai street food can be whipped up using a range of proteins, Mr. Yenbamroong refers to his riff as “low-rent” because it’s prepared with ground chicken rather than pricier slices of meat. It’s piled with basil; Thai basil or holy basil provide more assertive licorice notes, but sweet basil adds herbal bursts of brightness. Spiked with Thai seasoning (see Tip), the chicken mixture is salty on its own, but it’s inextricably linked with rice, and imparts the right amount of salinity when dispersed.", 
        author_id=1,
        timeToComplete=30,
        previewImage="https://static01.nyt.com/images/2022/08/29/dining/aw-pad-grapow-gai-1/merlin_212088519_ef79d3f5-7496-448a-8cf4-009939701ed4-master768.jpg?w=1280&q=75",
        instructions="Heat a wok or large nonstick skillet over medium-high, then swirl in the oil. Once the oil is shimmering, add the ground chicken and cook, actively breaking the chicken up into small pieces, until it is mostly cooked, about 6 minutes.Stir in the garlic, sugar and chile until evenly distributed and fragrant, about 2 minutes, then add the green beans, oyster sauce, fish sauce and Thai seasoning, and cook, stirring constantly, until the chicken is fully cooked, the green beans are crisp-tender and the krapow is glossy, about 2 minutes.;Remove from heat, add the basil and a dash of white pepper and toss to combine. If the sauce seems to cling too tightly to the mixture, add 1 to 2 tablespoons of water to make it loose and glossy.;Serve over rice, and top with a crispy fried egg, if desired. Serve with additional Thai seasoning to sprinkle on top, according to taste.;"
    )

    r2 = Recipe(
        title="Meatloaf", 
        description="This best ever meatloaf recipe lives up to its name and is my favorite I have found. Try it and you will see.", 
        author_id=2,
        timeToComplete=45,
        previewImage="https://www.allrecipes.com/thmb/mKY06P7OC1BDREL8DoSNxCK2vAo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2295590-Best-Ever-Meatloaf-ddmfs-083-4x3-1-6d7604c8b4204abd832a26ef85d0e58e.jpg",
        instructions="Preheat the oven to 350 degrees F (175 degrees C).;Whisk eggs, milk, salt, and ground black pepper in a large bowl. Add crumbled bread and stir until dissolved. Mix ground beef, onion, Cheddar cheese, and carrot into bread mixture; transfer mixture to a 9x5-inch loaf pan. Combine brown sugar, ketchup, and mustard in a small bowl; spread over the meat mixture.;Bake in the preheated oven until no longer pink in the center, 60 to 75 minutes. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C).;"
    )

    r3 = Recipe(
        title="S'mores Cookies", 
        description="This copycat recipe for Girl Scout S'mores Cookies can be frosted in different ways - try covering them with chocolate or marshmallow icing, or half and half, or just leave them plain.", 
        author_id=3,
        timeToComplete=35,
        previewImage="https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_SmoresBars-53_ayn9r6",
        instructions="Stir together 1/3 cup milk, honey, and vanilla extract in a small bowl. In a large bowl, stir together all-purpose flour, brown sugar, whole-wheat flour, baking soda, and salt. Cut in 1/2 cup cold butter, using a pastry blender, until mixture resembles coarse crumbs. Stir in milk mixture just until combined. If needed, knead gently to form a ball. Divide dough into fourths. Wrap each portion in plastic wrap and chill until easy to handle, about 1 hour.;Preheat oven to 350 degrees F (175 degrees C).;On a lightly floured surface, roll 1 portion of dough into a 6-inch square. Cut into 2-inch squares. Arrange 1 inch apart on an ungreased cookie sheet. Prick with a fork. Bake until edges are firm, 7 to 9 minutes. Remove; cool on a wire rack. Repeat with remaining dough.;For marshmallow icing, stir together marshmallow creme, powdered sugar, and 2 Tablespoons butter in a bowl. Stir in enough milk to reach dipping consistency. Dip cookies into icing, allowing excess to drip off. Arrange on wire racks set over wax paper; let stand until set.;For chocolate icing, microwave chocolate and shortening in a small bowl, stirring twice, until smooth, about 90 seconds. Spoon about 1 tablespoon melted chocolate over each cookie to coat. Let stand on a wire rack set over wax paper until set.;For sandwiches: Dip one side of cookie in marshmallow icing. Dip one side of another cookie in chocolate icing; sandwich cookies, icing sides facing in. Let set.;For half and halfs: Dip half the cookie in the marshmallow icing and half in the chocolate icing.;"
    )

    r4 = Recipe(
        title="Taiwanese Beef Noodle Soup", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id=1,
        timeToComplete=90,
        previewImage="https://thewoksoflife.com/wp-content/uploads/2018/03/taiwanese-beef-noodle-soup-instant-pot-15.jpg",
        instructions="Boil enough water in a pot to boil all of your beef. Once the water is boiling, add the beef. Let it come back up to a boil, and boil for 1 minute. Strain in a colander and rinse thoroughly with fresh water to remove any impurities.;Next, in your instant pot, turn on the saute setting. Add the oil, crushed ginger, garlic, scallions, and onions in that order. Stir to lightly caramelize. Let the onion turn translucent. Add the tomato and dried chilies.;Next, add the meat to the pot. Then add the tomato paste, spicy bean paste, sugar, soy sauce, and Shaoxing wine, and mix thoroughly.;Pour 8 cups of water into the instant pot. Add the spice packet. The instant pot should be filled to the 10-cup line; it shouldn’t be more than ⅔ of the way full per safety instructions. Our instant pot is the largest size (8 quarts); if yours is smaller, you can halve the recipe accordingly.;Close the lid of the instant pot, and make sure you have your vent set so it is not venting. Cook for 100 minutes on the Meat/Stew setting. If you don’t have an instant pot, you can use a regular pot on the stove, but instead, cook the soup on a low simmer for 3-4 hours.;When the instant pot timer is up, carefully release the pressure valve (wear an oven mitt, so you don’t scald yourself!). Boil some noodles per package instructions, and in the last minute or two of the noodles cooking, throw your bok choy in and blanch until just tender.;Serve each bowl of Taiwanese beef noodle soup with a serving of noodles, a few stalks of bok choy, and generous sprinklings of finely minced cilantro, scallions, and Chinese pickled mustard greens. Pro tip, buy the pre-seasoned spicy mustard greens and you can use them straight out of the package. If you are using the non-spicy version (from a can, for example), chop and saute with a little oil, a few chopped dried red chilies, and a pinch of sugar.;"

    )



    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
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
