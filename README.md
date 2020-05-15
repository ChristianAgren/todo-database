# Assignment REST-API with MongoDB

Link to [github repo](https://github.com/ChristianAgren/todo-database).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
and built using [Material-UI](https://material-ui.com/getting-started/installation/).
The server is built using [Node.js](https://nodejs.org/en/).
The database is built with [MongoDB](https://docs.mongodb.com/guides/).

## Project description

The assignment is to build a a site with a server, database and front-end, based on CRUD.

We've built a simple, highly editable, assignment list/ ToDo app.
You can login and edit users role, name and delete users.
You can continually add new assignments and assign them, aswell as add subtasks to the assignments you've created.

## Installation

When the project is cloned to your drive, start the project and run;

#### `npm i`

to install dependencies.

### Starting the project

The following command line is used in the project directory to start the backend part of the project.

#### `node expressApp.js`

If you intend to run the frontend part side by side, open a new terminal window and run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Additional scripts

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Assignment grading

This part is only for our teacher's reference, not the actual grading of the assignment.

### Passing grades:

- Git & GitHub have been used (Completed)
- The project has a README.md file (look above for more info) (Completed)
- The project is handed in on time! (Completed)
- It needs to be atleast two resources with CRUD-Endpoints (Completed)
- You should be able to register, log in and create content that is related to the user, that's logged in. (Completed)
- Only logged in users should be able to perform C_UD operations on their content. (Completed)
- All content should be saved in MongoDB. (Completed)


### Extra credits

- All of the passing grades are completed. (Completed)
- There should be an admin role that has admin privileges for all CRUD operations on all content. (Completed)
- The admin should have access to a user interface that lists all users and their roles. The admin should be able to use the user interface to remove users and change their roles. (Completed)


