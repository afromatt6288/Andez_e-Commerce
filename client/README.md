# Great  Bibli
 This is a page to view information about great ghibli films (ie, all of them). 

## Setup

All the information about Ghibli films can be found in the `db.json` file. We'll be using `json-server` to create a RESTful API for our database.

Run `npm install` to install our dependencies.

Then, run `npm run server` to start up `json-server` on `http://localhost:3001`.

if it doesn't work, you may need to install `json-server`. You can do that with the command: `npm install -g json-server` 

In another tab/terminal, run `npm start` to start up our React app at `http://localhost:3000`.



### What it does

You can create a profile that they can they use to log into the page.
Once Logged in, you can explore the nav bar to read info on the Home tab and About tab.
The Film tab will be the meat and potatoes of the site though. It lists all of the currently published Studion Ghibli films in a card format. They can be sorted by alphabetical or date of release. And they can be filtered by genre. Lastly, they can be searched through. 
If you select a movie, it opens to a Film Detail page which shows quite a bit about the movie. It also shows the characters of the movie. You can click on the characters to go to a detail page for them as well. 
There is also a Character tab that shows all the Ghibli characters. They can be filtered by the film they are in, and their species. And, if you click on them, it will lead to the Character Detail page you saw before. What wasn't mentioned before is that there is a film emblem you can click in the character tab to go to the movie they are in. Yes... both tabs cross reference each other!
For a normal user the last stop is the Merch tab. I do not have copyrite to sell Ghibli merch, so I provided links to some sites that do have it. 

What I just described was what a normal user would see. If someone logs in who is an Admin, they get an additional nav bar! They cad add a movie, add a character. They can also delete them. Lastly, they get a user tab where they can set users to admin status or delete them. 




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
