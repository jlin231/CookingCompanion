# Cooking Companion

This is the readme for Cooking Companion. This is a platform for creating recipes and ingredients as well as view the recipes created by other users. 

## Live Server Link

https://cookingcompanion.onrender.com

## Photos

![addIngredientsPage](https://user-images.githubusercontent.com/108918692/222290115-2309ca39-d6a3-4d1a-8c5e-3d52c4a23acd.png)
![createRecipePage](https://user-images.githubusercontent.com/108918692/222290119-10784b69-8b42-4273-9dab-2967b92a5c28.png)
![editDeleteIngredientsPage](https://user-images.githubusercontent.com/108918692/222290135-e3e49cc0-edb6-420c-b9f0-406dfe9be63e.png)
![explorePage](https://user-images.githubusercontent.com/108918692/222290162-e6b5c21c-38bd-40ad-9af4-60f072c22fd5.png)
![singleRecipePage](https://user-images.githubusercontent.com/108918692/222290187-3aa6c624-2d00-4cf9-81cd-26e9b48ebc88.png)
![splashPage](https://user-images.githubusercontent.com/108918692/222290209-5f264382-2f35-43b5-bf24-63a422a0e262.png)


## Wiki Link

* [Database Schema](https://github.com/jlin231/CookingCompanion/wiki/Database-Schema#backend-routes)
* [API Backend Routes](https://github.com/jlin231/CookingCompanion/wiki/Database-Schema#backend-routes)
* [Wireframe](https://github.com/jlin231/CookingCompanion/wiki/Wireframe)
* [User Stories](https://github.com/jlin231/CookingCompanion/wiki/User-Stories)
* [MVP Features](https://github.com/jlin231/CookingCompanion/wiki/MVP-Features)


7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Tech Stack

* Frameworks, Platforms, and Libraries:
   * Javascript
   * Python
   * HTML5
   * CSS3
   * Node.js
   * React
   * Redux
   * Flask
* ORM
   * SQLAlchemy
   * Alembic
* Database
   * Postgres
* Hosting
   * Render

## Getting Started

1. Clone this repository

2. Run the following in the root directory

   ```pipenv install -r requirements.txt```

3. Run the following command from within the ```react-app``` folder

   ```npm install```

4. Create a .env file based on the example with proper settings for your development

   ```
   SECRET_KEY=secret_key_super_secret
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=flask_schema
   FLASK_DEBUG=True
   ```

5. Enter into your pipenv environment. Run the following set of commands to seed and run your Flask application. 

   ```
   pipenv shell
   ```

   ```
   flask db upgrade
   ```

   ```
   flask seed all
   ```

   ```
   flask run
   ```

6. Enter into the ```react-app``` folder and run the following commands to start the react-front end. 

   ```
   npm start
   ```

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
