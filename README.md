## Requirements
You are the front-end engineer for an application designed to match employees in a mentoring program at a large company.
The application’s implementation is already in progress and there is a requirement to add the following functionality:

1. Users should have an option to suggest up to 5 matches as the last step in the registration flow. They can manage and reorder their suggestions.
2. After the registration user should be redirected to the profile page, where the user can edit the profile and suggestions.
3. Do not allow unauthorized users access to the profile page and restrict authenticated users to access login and registration pages.
4. Fix a bug related to routing. Route's current implementation allows rendering of the route-specific pages during page load, but pages do not render correctly in the case of the application’s inner navigation routes changing.

## Description
Mentoring application with multi-step registration, login, and authentication is implemented.
Application has routing with react-router v5, redux/toolkit storage, and basic design components.
Registration current flow contains 3 steps:

1. Personal information step,
2. Credentials (email, password) step,
3. Job details step.

Data is provided using Fake REST API using json-server with JWT authentication. Login and registration endpoints are implemented.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You may also see lint errors in the console.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# JSONServer + JWT Auth

A Fake REST API using json-server with JWT authentication.

Implemented End-points: login,register

## Install

```bash
$ npm install
$ npm run start-auth
```

Might need to run
```
npm audit fix
```

## How to login/register?

You can login/register by sending a POST request to

```
POST http://localhost:8000/auth/login
POST http://localhost:8000/auth/register
```
with the following data

```
{
  "email": "nilson@email.com",
  "password":"nilson"
}
```

You should receive an access token with the following format

```
{
   "access_token": "<ACCESS_TOKEN>"
}
```


You should send this authorization with any request to the protected endpoints

```
Authorization: Bearer <ACCESS_TOKEN>
```
