# Travelers fullstack Capstone

*Travelers is for travelers to search world wide venues and make own list.
*Server side repo: https://github.com/realnuno/travelers-capstone-server-node

## Screenshots

Login Page | Search Page
:-------------------------:|:-------------------------:
![Login Page](https://github.com/realnuno/travelers-capstone-client-react/blob/master/readme-imgs/login-page.png)  |  ![Search Page](https://github.com/realnuno/travelers-capstone-client-react/blob/master/readme-imgs/search-page.png)
Result Page| Detail Page
![Result Page](https://github.com/realnuno/travelers-capstone-client-react/blob/master/readme-imgs/result-page.png) | ![Detail Page](https://github.com/realnuno/travelers-capstone-client-react/blob/master/readme-imgs/detail-info-page.png)
Mylist Page View  | Sign Up Page View
![Mylist Page View](https://github.com/realnuno/travelers-capstone-client-react/blob/master/readme-imgs/mylist-page.png) | ![Sign Up Page View](https://github.com/realnuno/travelers-capstone-client-react/blob/master/readme-imgs/signup-page.png)


## User Cases
This app is for this type of users:
1. NEW PLACE FOR TRAVEL - For travelers, so that they can search and get a lot of recommendations for new places to visit.
2. OWN PLAY LIST - Users can save favorite results into your favorites list so they can check them any time without re-search.
3. WITH NOTE - Users can record ideas and ruminations about the places in your own personal note.


### Wireframes
Main Page             |  Mylist Page
:-------------------------:|:-------------------------:
![Main Page](https://github.com/realnuno/travelers-fullstack-capstone/blob/master/readme-imgs/Image1.jpeg)  |  ![Mylist Page](https://github.com/realnuno/travelers-fullstack-capstone/blob/master/readme-imgs/Image2.jpeg)

## Working Prototype
You can access a Node working prototype of the app here: https://travelers-server.herokuapp.com/ and React working prototype https://realnuno.github.io/travelers-fullstack-capstone-react/build

## Functionality
The app's functionality includes:
* User can search for every place on Earth
* User can save favorite place results into your favorites list
* User can record ideas and ruminations about the venue in your own personal note

## Technology
* Front-End: HTML5 | CSS3 | JavaScript ES6 | React | Redux | Enzyme
* Back-End: Node.js | Express.js | JWT Authentication | Bcrypt | Passport | Mocha | Chai | RESTful API Endpoints | MongoDB | MLab | Mongoose | Travis CI



## Responsive
App is strongly built to be usuable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Fancy alert for invalid inputs for example, invalid ID or password, search term.
* Divided sections of MyList for different kind of venues.

#  The typical command lines for capstone projects

## Node command lines
* npm install ==> install all node modules
    * npm install --save bcrypt bcryptjs body-parser cors express mongodb mongoose passport passport-http unirest
    * npm install --save-dev chai chai-http mocha faker
* nodemon server.js ==> run node server
* npm test ==> run the tests

## React command lines
* npm install ==> install all node modules
    * npm install --save bcrypt bcryptjs body-parser cheerio chokidar-cli concurrently core-js cors cpr enzyme enzyme-react-16-adapter-setup express http-server jsonwebtoken moment mongodb mongoose morgan npm-run-all passport passport-http passport-jwt passport-jwt-strategy react react-addons-test-utils react-dom react-fontawesome react-redux redux redux-thunk rimraf unirest
    * npm install --save-dev acorn babel-cli babel-core babel-loader babel-plugin-transform-object-rest-spread babel-polyfill babel-preset-es2015 babel-preset-react chai chai-enzyme chai-http enzyme-adapter-react-15 enzyme-adapter-react-16 faker json-loader mkdirp mocha react-scripts react-test-renderer sinon sinon-chai webpack
* npm run build ==> build the react files in the "build" folder
* npm start ==> run react server on http://127.0.0.1:8080
* npm test ==> run the tests
