# JoB

Javascript on backbone

# Development

## Getting started

1. [Install Node.js and npm](http://nodejs.org/download/ "node.js")
2. [Install Grunt](http://gruntjs.com/getting-started "Getting started - Grunt: The JavaScript Task Runner")
3. [Install Bower](http://bower.io "BOWER: A package manager for the web")
4. Install npm dependencies: `npm install`
5. Install Bower dependencies: `bower install`
6. If you want to run the tests suite through the command line, [install PhantomJS](http://phantomjs.org/download.html "PhantomJS: Download and Install")
7. Run `grunt` (default task) and point your browser to `http://localhost:8000/dev/`
8. When your awesome app is done, run `grunt production`. Your awesome app will be under `production/` folder, ready to be deployed wherever you want

## App structure

### General

* `/bower.json`: Bower dependencies file
* `/Gruntfile.coffee`: Grunt tasks definition file
* `/package.json`: npm dependencies file

### Testing

* `/src/test/specs/<spec>.coffee`: Here are the Mocha (with Chai) specs for your app
* `/src/test/fixtures/<fixture>`: If you need fixtures on your specs, put them here

## Grunt tasks

* `default`: Runs `dev` task and start an HTTP server using `connect:dev` task
* `dev`: Cleans `/dev`, compiles CoffeScript and LESS files under `/src` to `/dev`
* `production`: Cleans `/production`, compiles CoffeScript files under `/src` to `/dev`, runs the tests suite, compiles LESS files under `/src` to `/production` and optimize all JS files under `/dev` to `/production` using RequireJS
* `test`: compiles CoffeScript files under `/src` to `/dev`, launch an HTTP server using `connect:test` task and run all tests under `/dev/test`
* `watch`: Watches changes on CoffeeScript and LESS files to run appropiate tasks (for test files you should have a running test HTTP server with `grunt connect:dev` or `grunt` default task)

My preferred way of using these tasks for development is with three panes on my terminal. The first one with `grunt` (it will start everything up, including the HTTP server), second one with `grunt watch` (which will look for changes on my files) and the third one with my `$EDITOR`.

## Thanks

Huge thanks to [@juanghurtado](https://github.com/juanghurtado/puppeteer) for the Web development stack 'puppeteer' i borrowed most of the base code from.
