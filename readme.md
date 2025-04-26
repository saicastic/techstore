# TechStore :

# FRONTEND ( client folder ) :

### BASE STEP :

- We will crete a folder called 'client' so that our front end and backend are seperated.
- We have to first run `creat-react-app` command to create a react app in our 'client' folder.

### FOLDER STRUCTURE :

- src -> (assets, components, context, pages)
- **assets** - contains all the assets
- **components** - components folder
- **context** - contains global context
- **pages** - contains each page like (home, products etc)

### STEP 1 :

# BACKEND ( server folder ) :

### BASE STEP :

- So, now we will work on backend and for that we will create a new folder in main folder called 'server'.
- We will create a file called 'server.js' which will be our entry point for our backend.
- Now will initialize node in it using command `npm init`.
- It will create a 'package.json' and it will have all the info about the project.
- Convert 'type' key's value to 'module' so that we can use 'import/export' statements.

### STEP 1 - Install Dependencies and DevDependencies :

- Now we will download all the dependencies and devdependencies which are required for our project.
- ```bash
  npm i bcryptjs multer cloudinary dotenv mongoose cors cookie-parser jsonwebtoken stripe
  ```
- `npm install nodemon --save-dev`
- nodemon is added as devdependencies
- **bcryptjs** : used for password hashing
- **multer** : used for file upload handling
- **cloudinary** : used for cloud-based image/video management
- **cors** : used to connect front-end and back-end
- **stripe** : payment gateway provider
- **mongoose** : driver for mongodb
- **nodemon** : used to run server in watch mode and does server hot reloading on saving.

### STEP 2 - Create a Server :

- So now we will create a server in 'server.js' file.
- We will create a server in this file using 'express'.
- and also use middlewares to add cors and cooki-parser.

### STEP 3 - Folder Structure :

- create folders to manage everything.
- ( configs, controllers, middlewares, models, routes )
