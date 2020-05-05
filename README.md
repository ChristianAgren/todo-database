# Assignment REST-API with MongoDB

Link to [github repo](https://github.com/ChristianAgren/rest-api).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app),
and built using [Material-UI](https://material-ui.com/getting-started/installation/).
The server is built using [Node.js](https://nodejs.org/en/).

## Project description

The assignment is to build a RESTful API, based on CRUD. The API may contain data of your choosing, as long as there are 4 endpoints (GET, POST, PUT, DELETE) for your resource. The datapoints must have 4 attributes, where one of them is *id*.

I've built a simple, highly editable, assignment list/ ToDo app.
You can continually add new assignments and assign them, aswell as add subtasks to the assignments you've created.

## Installation

When the project is cloned to your drive, start the project and run;

#### `npm i`

to install dependencies.

### Starting the project

The following command line is used in the project directory to start the backend part of the project.

#### `node server.js`

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

- Project uses 4 endpoints (GET, POST, PUT & DELETE) for a resource. (Completed)
- All endpoints can be used by a .rest file. (Completed)
- The API data is saved locally in the server file (See below)
- Git & GitHub is used for the project. (Completed)
- The Project contains a README.md file. (Completed)
- The assignment is turned in on time. (Completed)

### Extra credits

- All of the passing grades are completed. (Completed)
- The API data is saved in a .JSON file instead of locally in the server file. (Completed)
- The API data is updated when something is added, updated or removed. (Completed)
- A simple frontend UI is built to fetch the endpoints and modify the API data, aswell as presenting the result via GET. (Completed)
- An additional GET endpoint is added so that the user can fetch a specific data point. (Completed)
