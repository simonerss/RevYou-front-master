[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Revyou Front-end 

This repository is part of the Revyou project, a tool to support the collaborative and distributed development of systematic reviews.

## Style Guides

  - [Airbnb React/JSX Style Guide] - This style guide is mostly based on the standards that are currently prevalent in JavaScript. Follow [this](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a) tutorial to configure ESLint in VSCode. 
  - [Udacity Git Commit] - This style guide acts as the official guide to follow when commiting to this project.

### Folder Structure
```
### A typical top-level directory layout

    .
    ├── node_modules			# All dependencies installed
    ├── public                  # Compiled files (alternatively `dist`)
    ├── docs                    # Documentation files (alternatively `doc`)
    ├── src                     # Source files (alternatively `lib` or `app`)
    ├── package.json
    └── README.md

```

```
### Src directory layout
src
├── api
├── conponents
├── images
├── menu
├── router
│   └── routes.js
├── screens
├── util
├── App.css
├── App.js
├── index.css   
└── index.js
```

### Tech

RevYou-front uses a number of open source projects to work properly:

This project was bootstrapped with [Create ReactApp](https://github.com/facebook/create-react-app).

* [React] - A JavaScript library for building user interfaces.
* [Prop-types] - Runtime type checking for React props and similar objects.
* [React Router] - React Router is a collection of navigational components that compose declaratively with your application.
* [Ant Design] - An enterprise-class UI design language and React-based implementation with a set of high-quality React components.
* [NPM] - A package manager for the JavaScript programming language.
* [ESLint] - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
* [Jest] - A library for testing JavaScript code. It's an open source project maintained by Facebook, and it's especially well suited for React code testing, although not limited to that: it can test any JavaScript code. 
* [React Testing Library] -  Simple and complete React DOM testing utilities that encourage good testing practices
* [Yup] - Yup is a JavaScript object schema validator and object parser. 
* [React Slick] - React slick is a carousel component built with React. 

### Installation

RevYou-front requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and run the app.

```sh
$ git clone https://github.com/DCOMP-UFS/RevYou-front.git
$ cd RevYou-front
$ npm install
$ npm start
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


[node.js]: <http://nodejs.org>
[React]: <https://reactjs.org/>
[Prop-types]: <https://www.npmjs.com/package/prop-types>
[React Router]: <https://reacttraining.com/react-router/>
[Ant Design]: <https://ant.design/>  
[NPM]: <https://www.npmjs.com/>
[ESLint]: <https://eslint.org/>
[Airbnb React/JSX Style Guide]: <https://github.com/airbnb/javascript/tree/master/react>
[Udacity Git Commit]: <https://udacity.github.io/git-styleguide/>
[Jest]: <https://jestjs.io/>
[React Testing Library]: <https://github.com/kentcdodds/react-testing-library>
[Yup]: <https://github.com/jquense/yup>
[React Slick]: <https://react-slick.neostack.com/>
