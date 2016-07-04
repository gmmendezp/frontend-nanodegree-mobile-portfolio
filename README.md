## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

## Dependencies
* [npm](https://www.npmjs.com/)
* [grunt-cli](https://github.com/gruntjs/grunt-cli)

## Optimizations to index

* Async google analytics
* Media query for print stylesheet
* Minified HTML, CSS and JS
* Optimized image sizes and compression. (pizzeria.jpg and profilepic.jpg)
* Inlined CSS, JS and images

## Optimizations to main.js

* Moved calculation of `phase` outside the loop in `updatePositions()` as it only needs 5 values
* Added `will-change: transform` and `transform: translateZ(0)` to create layers and reduce painting
* Replaced `querySelectorAll` with a more optimal `getElementsByClassName`
* Replaced `querySelector` with a more optimal `getElementById`
* Improved `changePizzaSizes` to use only percentages instead of coverting to pixels (removed determineDx)
* Created a variable for storing the selected objects for `randomPizzaContainer` instead of calculating it serveral times inside the loop

## Steps to run server

1. Clone the repository by downloading the zip file or using `git clone`
2. Open a terminal and go to the project folder
3. Execute `npm install`
4. Execute `grunt prepare` to prepare the files for the server
5. Execute `grunt serve` to run the server
6. Navigate to [http://localhost:8000](http://localhost:8000) in your browser

## Obtain PageSpeed Insights score for index

1. Do the steps to run the server
2. Open a new terminal tab and go to the project folder
3. Execute `grunt psi-ngrok`
