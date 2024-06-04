# Virtual Space with App Modules
Team: Nifty Narwhals

## Overview
![Dashboard](/assets/dashboard.JPG "Dashboard")
Virtual Space with App Modules is a full-stack web application aiming to provide a comforting and productive virtual experience for working remotely and learning online. It provides users with various app modules to help them concentrate on their tasks and boost productivity.
## Quick Start
Before running the app, run the following command to install the dependencies:
```
npm install or yarn install
```
Once all the dependencies are in place, run the following command to start the app:
```
npm start or yarn start
```
The app runs in the development mode and will automatically open in your browser at [http://localhost:3000](http://localhost:3000).\
Run the following command to launch the test runner:
```
npm test or yarn test
```
## Key Files
`_test_` Test cases\
`components` React components\
`contexts` Contexts for authentication and app & local storage\
`App.js` App entry\
`Firebase.js` Firebase configuration
## Features
### Landing Page
![Landing Page](/assets/landing-page.JPG "Landing Page")
The app's entry point is the landing page that provides an overview of Virtual Space’s mission and features. The top navigation bar includes links to the feature section and the about us section. It also contains a “Try It Out!” button that navigates to the app dashboard without login and relevant user buttons: the sign-in/up button if not logged in and the “Welcome Back” button and sign-out button if logged in. The sign-in/up module will display through an offcanvas element. Once authentication is complete, the app will automatically navigate to the app dashboard.
### Account & Profile
![User Profile](/assets/user-profile.JPG "User Profile")
The app allows users to create an account using the traditional email address signup method or a Google account to log in directly. The user account is automatically generated using the Firebase authentication service. A user entry will also be created inside the Firestore database.
Once authenticated, a user profile is populated based on the matching user information. Users then can upload a profile picture, update their account information or delete their account from the user profile. The uploaded image will be stored in the Firebase Cloud Storage. Once an account is deleted, the authentication, the user data entry, and the uploaded image will also be deleted.
### Dashboard
![App Module](/assets/app-modules.JPG "App Module")
The main app is displayed similarly to a dashboard. It consists of a navigation bar at the top, a theme selector on the right side, a toolbar on the left side, and a fullscreen video playing in the background.
#### Navigation
The navigation bar contains a Virtual Space brand that serves as a button that navigates back to the landing page and a fullscreen mode button. It also includes all the relevant user buttons: the sign-in/up button if not logged in and the profile button and sign-out button if logged in. The user profile module will display through an offcanvas element similar to the sign-in/up module.
#### Theme Selector
The theme selector features various background video scenes and colour themes to customise the app. There are four available themes: white, pink, brown and blue. 
Themes are styled using styled-components API, which creates a consistent and complete change of theme using the GlobalStyles component. The global styles are based on the chosen theme and dynamically re-render the look of the dashboard. The fullscreen video background also changes based on the selected theme. The dark mode option is the last available theme on the list, which changes the UI to a darker colour while maintaining the current theme.
#### Toolbar
On the left side of the app is a toolbar housing app modules available to users to customise their virtual space with pop-up app modules. Such modules include a todo list, a clock & timer, a weather feed, a video feed and a music feed. The toolbar also features a cleanup function that clears opened app modules from virtual space.
#### Todo List
Users can keep track of any tasks they wish to complete by opening up the Todo app module and adding them as items to the list. Each todo consists of a description of a task and a desired due date and notifies the user of the amount of time left to the due date (or how overdue the task is) in days. Upon completion, users can tick items off and remove any completed or irrelevant tasks. If users are logged in, todo list data is synced Firestore database; otherwise, it is persisted to local browser storage.
#### Clock & Timer
This app module contains a couple of time-related features. First, It provides a digital clock that displays the current time based on users’ location. Second, it offers a countdown timer, allowing users to set a target date and time for the countdown. It calculates the days, hours, minutes and seconds and counts down until the specified time has been reached, which helps set regular study periods and allows break times.
#### Weather Feed
Users can check out the local weather forecast inside this app module, including temperature and rain. This component depends on two third-party APIs for sensitive privacy permissions, namely the Google Map API for querying the name of the target city by latitude and longitude and the Open-Weather API for querying the target weather by latitude and longitude. Sensitive privacy permissions are location permissions for the current user's location to get accurate weather information. If the user is concerned about privacy, the user will be asked whether to grant location permission when opening the component for the first time. If the user does not grant location permission for the application, the component will choose the location of the University of Auckland by default. The loading speed of this component depends on the user's current network speed due to the networking queries of third-party APIs involved.
#### Video Feed
Click on it and get Rickrolled. It’s set as auto-playing and muted. Due to CORS issues, users cannot change video selection as the music player does.
#### Music Feed
This app module utilizes the [widget API from Soundcloud](https://developers.soundcloud.com/docs/api/html5-widget#methods) with play/pause/volume/track selection controls. Users can enter a playlist or track URL to the input field, and the player will load the tracklist from the given source. After multiple tracks are loaded, the player jumps to the next one in order after a track finishes. The track selection logic for the out-of-bound index will convert to the first/last song instead. Otherwise, the player loads a particular track by default.
## Tools
### Toolchain
React is the framework for the development of this project. The componentisation of React reduces the difficulty of multi-party collaboration. All components are handled using hooks for easy maintenance and reuse of code. This project uses the Create-React-App toolchain as the starting point.
### Database
Firebase is the core service used as the backbone of the user authentication, the user database, and the cloud storage of this project. It seamlessly combines all these three services and serves the entire backend of the web app.
Firebase authentication offers a smooth and hassle-free authentication process, allowing any user to quickly log in through an email account or any other third-party social media account, for instance, the Google login. Firestore provides a convenient No-SQL style cloud database. The read and write to the cloud database is almost instant. Cloud Storage integrates nicely with Firebase authentication and Firestore with a decent amount of free cloud storage.
### Version Control
GitHub is the version control tool for the project. Each team member would work on their assigned tasks in their branches, allowing tasks to be completed in parallel. When a functionality has been developed and implemented, team members will create a pull request to signify that their code is ready to be merged into the main branch. The code would need to be reviewed and approved by at least one other team member. If the reviewer requested changes to the code, these changes would need to be implemented before merging.
### Testing
Multiple testing cases are included in the project using the React Testing Library and JEST.
## Project Management
Detailed meeting schedule and workload breakdown can be found under the Wiki section.
### Workflow
The project was managed through a Trello Board in a Kanbanized style. It kept track of all project tasks such as planning, implementation and documentation activities, and task assignments and progress so that task progress can be tracked and reflected in real-time.
### Communication
Zoom meetings were conducted weekly. The meetings’ agenda usually revolved around reviewing progress regarding assignments, addressing development issues and assigning new tasks. Towards the end of the project, weekly meetings were conducted on Discord or Google Meets. Discord was the primary communication channel for the team, where team members could make announcements, communicate about urgent issues or update members about pending pull requests ready for review.
