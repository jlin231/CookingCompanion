# Cooking Companion

This is the readme for Cooking Companion. This is a platform for creating recipes and ingredients as well as view the recipes created by other users. 

## Live Server Link

https://cookingcompanion.onrender.com

## Photos



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
