// require mongoose, a popular MongoDB library for nodejs
// Mongoose connects in the app.js file. Once mongoose is connected,
// it stays connected across all of the files in this project
// As long as you import this after you have connected,
// then mongoose will give you the active DB connection which is what we want
const mongoose = require('mongoose');

// Set mongoose's Promise to ES6 promises.
// Mongoose prefers its promises features are override with a true promise library.
// This usually means either native ES6 promises or a library like bluebird.
// A promise is an object or construct of future code.
// Basically a promise is a placeholder for something that has not been computed yet.
// Essentially you want to do a task that may take some time. You create a promise.
// Then your code moves on without the promise really doing anything.
// Your code can check to see if the promise has been fulfilled yet. It's possible the
// code in the promise has completed, has not completed or will never complete.
// Based on that, you can make decisions later in code.
// You can also say what to do when the promise completes.
// At first promises may look confusing. Your code creates a promise of code to run, then
// your code moves on doing other stuff. The result of that promise is probably null
// because it has not run yet. At some point in the future, that promise will run,
// and execute the code of the promise.
// For some operations this is completely necessary, such as database i/o.
// Databases are an external application (often not even on the same machine).
// Waiting for the database code to finish is very expensive because you don't know
// when that will ever happen. This means your code might get locked up permanently
// or slowed down (if that machine is overwhelmed). Without promises or threading,
// then your code becomes hyper slow or completely deadlocked waiting for the database
// code to finish. That means your server starts dropping requests or outright failing.
// Promises (and also threads) prevent this from occurring by letting your code continue on
// with the promise that the database code may or may not eventually finish.
// Later in your code, you can check to see which occurred.
mongoose.Promise = global.Promise;


// create model before initialized down below, due to certain variables needing it
let DogModel = {};

// create schema
const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },

});

// static method that finds a dog by its name
DogSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };

  return DogModel.findOne(search, callback);
};


DogModel = mongoose.model('Dog', DogSchema);


// export our public properties
module.exports = {
  DogModel,
  DogSchema,
};
