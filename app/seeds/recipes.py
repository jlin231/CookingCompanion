from app.models import db, Recipe, environment, SCHEMA, Collection, Comment

import random

timeToCompleteValues = [15,30,45,200,100,150]; 
authors= [1,2,3]



def seed_recipes():
    r1 = Recipe(
        title="Pad Krow Pow", 
        description="As dynamic as it is speedy, this ground chicken and green bean recipe from “Night + Market” (Clarkson Potter, 2017) by Kris Yenbamroong and Garrett Snyder, delivers a wallop of flavor with punchy ingredients that stir-fry in just 15 minutes. While this popular Thai street food can be whipped up using a range of proteins, Mr. Yenbamroong refers to his riff as “low-rent” because it is prepared with ground chicken rather than pricier slices of meat. It’s piled with basil; Thai basil or holy basil provide more assertive licorice notes, but sweet basil adds herbal bursts of brightness. Spiked with Thai seasoning (see Tip), the chicken mixture is salty on its own, but it is inextricably linked with rice, and imparts the right amount of salinity when dispersed.", 
        author_id=1,
        timeToComplete=30,
        previewImage="https://static01.nyt.com/images/2022/08/29/dining/aw-pad-grapow-gai-1/merlin_212088519_ef79d3f5-7496-448a-8cf4-009939701ed4-master768.jpg?w=1280&q=75",
        instructions="Heat a wok or large nonstick skillet over medium-high, then swirl in the oil. Once the oil is shimmering, add the ground chicken and cook, actively breaking the chicken up into small pieces, until it is mostly cooked, about 6 minutes.Stir in the garlic, sugar and chile until evenly distributed and fragrant, about 2 minutes, then add the green beans, oyster sauce, fish sauce and Thai seasoning, and cook, stirring constantly, until the chicken is fully cooked, the green beans are crisp-tender and the krapow is glossy, about 2 minutes.;Remove from heat, add the basil and a dash of white pepper and toss to combine. If the sauce seems to cling too tightly to the mixture, add 1 to 2 tablespoons of water to make it loose and glossy.;Serve over rice, and top with a crispy fried egg, if desired. Serve with additional Thai seasoning to sprinkle on top, according to taste.;"
    )

    r2 = Recipe(
        title="Meatloaf", 
        description="This best ever meatloaf recipe lives up to its name and is my favorite I have found. Try it and you will see.", 
        author_id=1,
        timeToComplete=45,
        previewImage="https://www.allrecipes.com/thmb/mKY06P7OC1BDREL8DoSNxCK2vAo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2295590-Best-Ever-Meatloaf-ddmfs-083-4x3-1-6d7604c8b4204abd832a26ef85d0e58e.jpg",
        instructions="Preheat the oven to 350 degrees F (175 degrees C).;Whisk eggs, milk, salt, and ground black pepper in a large bowl. Add crumbled bread and stir until dissolved. Mix ground beef, onion, Cheddar cheese, and carrot into bread mixture; transfer mixture to a 9x5-inch loaf pan. Combine brown sugar, ketchup, and mustard in a small bowl; spread over the meat mixture.;Bake in the preheated oven until no longer pink in the center, 60 to 75 minutes. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C).;"
    )

    r3 = Recipe(
        title="Smores Cookies", 
        description="This copycat recipe for Girl Scout Smores Cookies can be frosted in different ways - try covering them with chocolate or marshmallow icing, or half and half, or just leave them plain.", 
        author_id=3,
        timeToComplete=35,
        previewImage="https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_SmoresBars-53_ayn9r6",
        instructions="Stir together 1/3 cup milk, honey, and vanilla extract in a small bowl. In a large bowl, stir together all-purpose flour, brown sugar, whole-wheat flour, baking soda, and salt. Cut in 1/2 cup cold butter, using a pastry blender, until mixture resembles coarse crumbs. Stir in milk mixture just until combined. If needed, knead gently to form a ball. Divide dough into fourths. Wrap each portion in plastic wrap and chill until easy to handle, about 1 hour.;Preheat oven to 350 degrees F (175 degrees C).;On a lightly floured surface, roll 1 portion of dough into a 6-inch square. Cut into 2-inch squares. Arrange 1 inch apart on an ungreased cookie sheet. Prick with a fork. Bake until edges are firm, 7 to 9 minutes. Remove; cool on a wire rack. Repeat with remaining dough.;For marshmallow icing, stir together marshmallow creme, powdered sugar, and 2 Tablespoons butter in a bowl. Stir in enough milk to reach dipping consistency. Dip cookies into icing, allowing excess to drip off. Arrange on wire racks set over wax paper; let stand until set.;For chocolate icing, microwave chocolate and shortening in a small bowl, stirring twice, until smooth, about 90 seconds. Spoon about 1 tablespoon melted chocolate over each cookie to coat. Let stand on a wire rack set over wax paper until set.;For sandwiches: Dip one side of cookie in marshmallow icing. Dip one side of another cookie in chocolate icing; sandwich cookies, icing sides facing in. Let set.;For half and halfs: Dip half the cookie in the marshmallow icing and half in the chocolate icing.;"
    )

    r4 = Recipe(
        title="Taiwanese Beef Noodle Soup", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id= 2,
        timeToComplete=90,
        previewImage="https://thewoksoflife.com/wp-content/uploads/2018/03/taiwanese-beef-noodle-soup-instant-pot-15.jpg",
        instructions="Boil enough water in a pot to boil all of your beef. Once the water is boiling, add the beef. Let it come back up to a boil, and boil for 1 minute. Strain in a colander and rinse thoroughly with fresh water to remove any impurities.;Next, in your instant pot, turn on the saute setting. Add the oil, crushed ginger, garlic, scallions, and onions in that order. Stir to lightly caramelize. Let the onion turn translucent. Add the tomato and dried chilies.;Next, add the meat to the pot. Then add the tomato paste, spicy bean paste, sugar, soy sauce, and Shaoxing wine, and mix thoroughly.;Pour 8 cups of water into the instant pot. Add the spice packet. The instant pot should be filled to the 10-cup line; it should not be more than ⅔ of the way full per safety instructions. Our instant pot is the largest size (8 quarts); if yours is smaller, you can halve the recipe accordingly.;Close the lid of the instant pot, and make sure you have your vent set so it is not venting. Cook for 100 minutes on the Meat/Stew setting. If you do not have an instant pot, you can use a regular pot on the stove, but instead, cook the soup on a low simmer for 3-4 hours.;When the instant pot timer is up, carefully release the pressure valve (wear an oven mitt, so you don’t scald yourself!). Boil some noodles per package instructions, and in the last minute or two of the noodles cooking, throw your bok choy in and blanch until just tender.;Serve each bowl of Taiwanese beef noodle soup with a serving of noodles, a few stalks of bok choy, and generous sprinklings of finely minced cilantro, scallions, and Chinese pickled mustard greens. Pro tip, buy the pre-seasoned spicy mustard greens and you can use them straight out of the package. If you are using the non-spicy version (from a can, for example), chop and saute with a little oil, a few chopped dried red chilies, and a pinch of sugar.;"
    )

    r5 = Recipe(
        title="Sauteed Vegetables", 
        description="This sautéed vegetable recipe is a delicious mix of zucchini, bell peppers, garlic, and jalapeno lightly pan-fried in butter and olive oil.", 
        author_id=1,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://www.cookingclassy.com/wp-content/uploads/2021/07/sauteed-vegetables-12-768x1152.jpg",
        instructions="Heat oil in pan: Heat olive oil in a 12-inch skillet over medium-high heat.;Saute crisp veggies: Add bell pepper, carrots, onion and broccoli. Saute 4 minutes (toss just occasionally so it can brown slightly).;Then add soft veggie: Add squash, saute 3 minutes.;Add seasonings, saute till tender: Toss in garlic, thyme and season with salt and pepper to taste. Saute 2 minutes or until veggies are just tender.;Garnish: Sprinkle with parlsey and lemon juice, toss. Serve with parmesan if desired.;"
    )

    r6 = Recipe(
        title="Blueberry Muffins", 
        description="These blueberry muffins are extra large and yummy with a sugary-cinnamon crumb topping. I usually double the recipe and fill the muffin cups just to the top for a wonderful, extra-generously-sized, deli-style muffin. Add extra blueberries if you want!", 
        author_id=3,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://www.culinaryhill.com/wp-content/uploads/2022/03/Blueberry-Muffins-Culinary-Hill-LR-09.jpg",
        instructions="Preheat the oven to 400 degrees F (200 degrees C). Grease 8 muffin cups or line with paper liners.;For the muffins: Whisk flour, sugar, baking powder, and salt together in a large bowl.;Pour oil into a small liquid measuring cup. Add egg and enough milk to reach the 1-cup mark; stir until combined. Pour into flour mixture and mix just until batter is combined. Fold in blueberries; set batter aside.;For the crumb topping: Combine sugar, flour, butter, and cinnamon in a small bowl. Mix with a fork until crumbly.;Spoon batter into the prepared muffin cups, filling right to the top. Sprinkle with crumb topping.;Bake in the preheated oven until a toothpick inserted in the center of a muffin comes out clean, 20 to 25 minutes.;"
    )

    r7 = Recipe(
        title="Nachos", 
        description="These homemade nachos are great for game day. This recipe makes a huge meal-sized tray of nachos with lots of good stuff! You can adjust ingredient quantities to suit your preference. Serve with extra chips if required.", 
        author_id=1,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://losfoodiesmagazine.com/wp-content/uploads/2021/10/Nachos-Supreme-500x500.jpg",
        instructions="Preheat oven to 425 F and line a large baking sheet with foil. In a large skillet over medium heat, heat oil. Add onion and cook until soft, 5 minutes, then add ground beef and cook until no longer pink, 6 minutes more. Drain fat.;Add garlic and taco seasoning and season with salt. Cook until meat is well browned and slightly crispy, 5 minutes more. Add refried beans and water to skillet and stir until combined. ;Add half the tortilla chips and top with beef-bean mixture, half the cheese, half the black beans, and half the pickled jalapenos. Repeat one more layer.;Bake until cheese is melty, 15 minutes.;Scatter with tomato, avocado, green onions, and cilantro. Drizzle with sour cream and hot sauce and serve immediately.;"
    )

    r8 = Recipe(
        title="Peanut Butter and Jelly Sandwich", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id=3,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/desktopimages/2018_grilled-peanut-butter-and-jelly_20336_600x600.jpg?ext=.jpg",
        instructions="Gather the ingredients.;Prepare peanut butter sandwich using desired jelly or jam. Make sure it is not too runny because the sandwich will be heated and jam could leak out.;Heat a frying pan to melt 1 tablespoon of butter. Tilt pan so butter covers pan evenly. This is key to get a perfectly crispy crust on the bread.;Butter one side of sandwich. Place buttered-side down in the pan. If possible, place a steak weight or bacon press on sandwich so it cooks evenly. When one side is golden brown, butter other side. Turn sandwich over and place weight back on sandwich. The second side will cook faster because sandwich is already heated.;Remove sandwich from pan, cut diagonally and serve immediately.;"
    )

    r9 = Recipe(
        title="Spaghetti and Meatballs", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id= 2,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://i0.wp.com/www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg?resize=1120%2C1451&ssl=1",
        instructions="Preheat oven to 425 degrees F.;Place a large pot of water on to boil for spaghetti. When it boils, add salt and pasta and cook to al dente.;Mix beef and Worcestershire, egg, bread crumbs, cheese, garlic, salt and pepper. Roll meat into 1 1/2 inch medium-sized meatballs and place on nonstick cookie sheet or a cookie sheet greased with extra-virgin olive oil. Bake balls 10 to 12 minutes, until no longer pink.;Heat a deep skillet or medium pot over moderate heat. Add oil, crushed pepper, garlic and finely chopped onion. Saute 5 to 7 minutes, until onion bits are soft. Add beef stock, crushed tomatoes, and herbs. Bring to a simmer and cook for about 10 minutes.;Toss hot, drained pasta with a few ladles of the sauce and grated cheese. Turn meatballs in remaining sauce. Place pasta on dinner plates and top with meatballs and sauce and extra grated cheese. Serve with bread or garlic bread (and some good chianti!);"
    )

    r10 = Recipe(
        title="Japanese Miso Soup", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id=1,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://www.justonecookbook.com/wp-content/uploads/2022/06/Miso-Soup-8271-II.jpg",
        instructions="Combine water and dashi granules in a medium saucepan over medium-high heat; bring to a boil.;Reduce heat to medium and whisk in miso paste.;Stir in tofu.;Separate the layers of green onions, and add them to the soup.;Simmer gently for 2 to 3 minutes before serving.;"
    )

    r11 = Recipe(
        title="Thai Green Curry", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id=random.choice(authors),
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://hot-thai-kitchen.com/wp-content/uploads/2022/05/green-curry-new-sq-2.jpg",
        instructions="Heat oil in a heavy based skillet or pot over medium high heat.;Add curry paste (and garlic, ginger and lemongrass Extras, if using) and cook for 2 to 3 minutes until it mostly dries out. Do not breath in the fumes!!;Add chicken broth and coconut milk, mix to dissolve paste.;Curry in a jar seasonings: Add 1 tsp fish sauce, 1 tsp sugar, no salt.;Homemade curry paste seasonings: Add 3 tsp fish sauce, 3 tsp sugar, 1/8 tsp salt.;Add kaffir lime leaves. Mix then bring to simmer.;Add chicken, stir then lower heat to medium so it is bubbling gently. Cook 7 minutes.;Add eggplants, cook 5 minutes until soft.;Taste sauce. Add fish sauce or salt for more saltiness, sugar for sweetness.;Add snow peas, cook 2 minutes until a bit softened, then stir through basil and lime juice. Sauce should have reduced but will still be a be on the thin side, not thick - that is how it is should be. DO NOT keep simmering - sauce will darken.;Serve curry over jasmine rice with garnishes of choice.;"
    )

    r12 = Recipe(
        title="Korean Bibimbap", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id=1,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dolsot-bibimbap.jpg/1600px-Dolsot-bibimbap.jpg",
        instructions="Gather the ingredients.;To begin, you will need to cook the rice in a rice cooker or on the stove. If you do not want to use Korean or Japanese rice or are being health conscious, you can try brown rice instead. This will affect the flavor, of course.;Cook rice on stove in a pot;Next, give the cucumber strips a salt water bath for 20 minutes.;Add cucumber strips to salt water;Drain the cucumber strips using a sieve.;Drain cucumber strips;Then, season spinach with 2 teaspoons sesame oil, 1 teaspoon of the salt, and 1 dash of the sesame seeds.;Season spinach with sesame oil, salt, and sesame seeds;Season bean sprouts with 2 teaspoons sesame oil, remaining 1 teaspoon salt, and the remaining dash of sesame seeds.;Season bean sprouts with sesame oil, salt, and a dash of sesame seeds;You will then need to sauté the carrots with a dash of salt.;Sauté carrots with salt;Next, sauté the mushrooms with a dash of salt.;Sauté mushrooms with salt After that, sauté the zucchini with a dash of salt.;Sauté zucchini with salt Then, place the cooked rice in a large bowl and arrange vegetables on top.;Place the cooked rice in a large bowl and arrange vegetables on top If desired, meat, egg, or both can be placed in the center.;Add egg to the bibimbap in the bowl Serve each helping with small bowls of gochujang and remaining sesame oil.;"
    )

    r13 = Recipe(
        title="Chinese Stir-Fried Vegetables", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id=1,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://thewoksoflife.com/wp-content/uploads/2022/02/vegetable-stir-fry-9-650x873.jpg",
        instructions="Boil enough water in a pot to boil all of your beef. Once the water is boiling, add the beef. Let it come back up to a boil, and boil for 1 minute. Strain in a colander and rinse thoroughly with fresh water to remove any impurities.;Next, in your instant pot, turn on the saute setting. Add the oil, crushed ginger, garlic, scallions, and onions in that order. Stir to lightly caramelize. Let the onion turn translucent. Add the tomato and dried chilies.;Next, add the meat to the pot. Then add the tomato paste, spicy bean paste, sugar, soy sauce, and Shaoxing wine, and mix thoroughly.;Pour 8 cups of water into the instant pot. Add the spice packet. The instant pot should be filled to the 10-cup line; it should not be more than ⅔ of the way full per safety instructions. Our instant pot is the largest size (8 quarts); if yours is smaller, you can halve the recipe accordingly.;Close the lid of the instant pot, and make sure you have your vent set so it is not venting. Cook for 100 minutes on the Meat/Stew setting. If you don’t have an instant pot, you can use a regular pot on the stove, but instead, cook the soup on a low simmer for 3-4 hours.;When the instant pot timer is up, carefully release the pressure valve (wear an oven mitt, so you don’t scald yourself!). Boil some noodles per package instructions, and in the last minute or two of the noodles cooking, throw your bok choy in and blanch until just tender.;Serve each bowl of Taiwanese beef noodle soup with a serving of noodles, a few stalks of bok choy, and generous sprinklings of finely minced cilantro, scallions, and Chinese pickled mustard greens. Pro tip, buy the pre-seasoned spicy mustard greens and you can use them straight out of the package. If you are using the non-spicy version (from a can, for example), chop and saute with a little oil, a few chopped dried red chilies, and a pinch of sugar.;"
    )
    r14 = Recipe(
        title="Vietnamese Pho", 
        description="Taiwanese Beef Noodle Soup is a perfect orchestration of tender beef, a rich and slightly spicy broth, fresh noodles, a little bok choy, and that absolutely necessary fistful of Chinese pickled mustard greens and fresh scallions and cilantro.", 
        author_id=1,
        timeToComplete=random.choice(timeToCompleteValues),
        previewImage="https://www.savoredjourneys.com/wp-content/uploads/2018/02/vietnamese-pho-t1.jpg",
        instructions="Add beef bones to a large pot that will hold at least 10 quarts. Then, cover bones with cold water. Place pot onto high heat and bring to a boil. Boil for 3 to 5 minutes. During this time, impurities and foam (or scum) will be released and rise to the top. Drain bones, discarding the water. Then, rinse bones with warm water and scrub stockpot to remove any residue that has stuck to the sides. Add the bones back to the stockpot and cover with 6 quarts of cold water.;Meanwhile, move an oven rack to a high position then turn broiler to high. Line a baking sheet with aluminum foil. Place quartered onions and halved ginger onto baking sheet then broil for 10 to 15 minutes, turning onions and ginger occasionally so that they become charred or browned on all sides.;Add cinnamon sticks, coriander seeds, fennel seeds, star anise, cloves and the black cardamom pod to a dry frying pan. Place onto low heat and cook, stirring occasionally until fragrant. About 5 minutes. Place toasted spices into a cotton muslin bag/herb sachet or cheesecloth then tie with butchers twine to seal.;Bring stockpot with parboiled bones and water to a boil then lower to a gentle simmer. Add charred onion and ginger as well as the bag or sachet of toasted spices. Add 1 1/2 tablespoons of salt, a 1/4 cup of fish sauce and the rock sugar. Continue to simmer broth, uncovered, for 3 hours. If at any time foam or scum rises to the surface, use a spoon to remove it.;"
    )

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.add(r7)
    db.session.add(r8)
    db.session.add(r9)
    db.session.add_all([r10, r11, r12, r13, r14])
    db.session.commit()

    c1 = Collection(
        name="Noodle Dishes",
        description="Great noodle recipes for the weekend.",
        author_id = 1
    )
    c2 = Collection(
        name="Home Recipes",
        description="Great home recipes for the weekend or the weekday.",
        author_id = 2
    )
    c3 = Collection(
        name="Desserts",
        description="Great dessert recipes for the weekend",
        author_id = 3
    )
    c4 = Collection(
        name="Snacks",
        description="Great snack recipes for the weekend",
        author_id = 3
    )
    
    
    c1.recipes.append(r1)
    c1.recipes.append(r2)
    c1.recipes.append(r5)
    c1.recipes.append(r13)

    c2.recipes.append(r4)
    c2.recipes.append(r9)
    c2.recipes.append(r14)
    
    c3.recipes.append(r3)
    c3.recipes.append(r6)

    c4.recipes.append(r7)
    c4.recipes.append(r10)
    c4.recipes.append(r12)

    db.session.add_all([c1, c2, c3, c4]);
    db.session.commit()

    # com1 = Comment(
    #     comment='What a great Recipe!', recipe_id=2, author_id=1)
    # com2 = Comment(
    #     comment='Amazing Recipe!', recipe_id=2, author_id=1)
    # com3 = Comment(
    #     comment='I really enjoyed working with this recipe and I will definetly try it again.', recipe_id=2, author_id=1)
    # com4 = Comment(
    #     comment='I would replace this with less salt but otherwise a great recipe.', recipe_id=2, author_id=1)
    # com5 = Comment(
    #     comment='Not my favorite recipe, but the website works great!', recipe_id=2, author_id=1)
    # com6 = Comment(
    #     comment='Thank you for the time you took to write this recipe!', recipe_id=2, author_id=1)

    # db.session.add([com1, com2, com3, com4, com5, com6])
    # r2.comments.extend([com1, com2, com3, com4, com5, com6])
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

def undo_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.collection_recipes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM collection_recipes")
        db.session.execute("DELETE FROM collections")
        
    db.session.commit()
