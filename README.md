# Loggabat

[![Coverage Status](https://coveralls.io/repos/github/jaxtisapia/loggabat/badge.svg?branch=master)](https://coveralls.io/github/jaxtisapia/loggabat?branch=master) [![Build Status](https://travis-ci.org/jaxtisapia/loggabat.svg?branch=master)](https://travis-ci.org/jaxtisapia/loggabat)

Special Logger for filtering logs you need in production, and logs you need in test mode only.

Do not dread over which comments you need to eliminate before production, LoggaBat got ur' back!! 

Get a full history of all messages you have logged to your console, just at the call of a function

```js

const loggabat = new Loggabat({
    productionMode: process.env.NODE_ENV
});

loggabat.warn("First goblin on the ground!!");

```

# Features

  - Selectively log messages to your console, by flags

  - Organize all your logs to your console

  - Recollect all messages you have logged

### Installation

Loggabat requires [JS] to run.

Install the dependency via npm

```sh
npm install --save loggabat
```

### Importing

```sh
// Using Node.js - require()
const Loggabat = require('loggabat');

// Using ES6 imports
import Loggabat from 'loggabat';
```

### Usage

Creating a new loggabat:

```js
const loggabat = new Loggabat({
    productionMode: true,  // I am running in production mode
    prefix: "My app name space"
});
```

Setting environments:

```js

// First approach, through a constructor
const loggabat = new Loggabat({ productionMode: true });

// Second approach
loggabat.setTestEnvironment(); // Environment in test mode now
loggabat.setProductionEnvironment(); // Environment in production mode now
```

```js
loggabat.info(); // corresponds to console.info()
loggabat.log(); // corresponds to console.log()
loggabat.warn(); // corresponds to console.warn()
loggabat.error(); // corresponds to console.error()
```

Logging to your console:

```js
const loggabat = new Loggabat({
    productionMode: true,  // I am running in production mode
    prefix: "My app name space"
});

loggabat.info("I am confirmed"); // {nothing happens}

loggabat.prod().info("I am confirmed"); // My app name space: I am confirmed
loggabat.production().info("I am confirmed"); // My app name space: I am confirmed

loggabat.setTestEnvironment(); // In test environment now

loggabat.info("I am confirmed"); // My app name space: I am confirmed
loggabat.prod().info("I am confirmed"); // My app name space: I am confirmed
loggabat.production().info("I am confirmed"); // My app name space: I am confirmed
```

`All messages you need in production should be preceeded 
by "prod()" or "production()". 
This identifies your log message as a production-friendly one. 
Only production-friendly messages will be logged and recorded 
in a production environment`

Setting your prefix:
```js
// Assuming loggabat is already in test mode
loggabat.setPrefix("My app's new name");

loggabat.warn("App crashed"); // My app's new name: App crashed
```

Getting your prefix set to your Loggabat instance:
```js
const loggabat = new Loggabat({ prefix: "Waist Training App" });
loggabat.prefix(); // Waist Training App
```

Determine prefix set already for a Loggabat instance:
```js
const loggabat = new Loggabat({ });
loggabat.isPrefixSet(); // false

loggabat.setPrefix("Bomberman!!!!");
loggabat.isPrefixSet(); // true
```

Getting history of all successful logs:

```js
loggabat.setProductionEnvironment(); // In production mode now, only production-friendly messages are accepted

loggabat.info("Parables"); // {nothing happens - not added to history}
loggabat.prod().info("Crucibles"); // Crucibles {Saved to history}

loggabat.setTestEnvironment(); // In test mode now
loggabat.prod().info("Tahoes"); // Tahoes {Saved to history}
loggabat.info("Placenta"); // Placenta {Saved to history}

loggabat.getHistory();
// [
//    { type: 'info', logged:'true', message: "Crucibles"}, 
//    {..., message:'Tahoes'},
//    {..., message:'Placenta'}
//  ]
```

Resetting your history:
```js
loggabat.resetHistory(); // clears history
loggabat.getHistory() //  Returns -> []
```

### Misc
Project is in its early stages and all contributions are welcome.


### Contribution Guide
`Documentation to follow soon`

# License

MIT © Justice Appiah
