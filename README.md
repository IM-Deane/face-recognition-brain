# Smart Brain

![Project Header](https://github.com/IM-Deane/images/blob/main/assets/images/smart-brain-thumbnail.jpg)

[Live Demo](https://smart-brain-im-deane.netlify.app/)

## Description

This was the final project for the ZTM Academy
course:[The Complete Web Developer in 2021: Zero to Mastery](https://zerotomastery.io/career-paths/become-a-web-developer).

The goal of this project was to create an app that uses AI facial regcognition
software to detect human faces.

## Features

Users must be able to create a new account by registering.

After successfully registering, the user should be able to sign into their new
account.

Once the user is signed in, they can paste an image url link into the input bar.

The app will then scan the image and determine if a human face is present.\*

The app should also track the amount of entries the user has submitted. After a
face has been detected, the app will increase the user's total entry count by
one.

Finally, users should have the option to sign out after they're finished.

- Note: The current version of the app does not support group photos. It will
  stop after the first face is found.

### Stack

- React
- CSS3
- PostgreSQL
- Node/Express

## Getting Started

If you would like to build off of this project, please follow the steps below.

1. Clone this repo
2. From the root directory, run `cd smart-brain-api/ && npm install`
3. Run `npm start`
4. Then in another terminal, run `cd ../client && npm install`
5. Finally, run `npm start`
6. To use this app, you must add your own API key in the `src/App.js` file to
   connect to Clarifai.

You can grab Clarifai API key [here](https://www.clarifai.com/)
