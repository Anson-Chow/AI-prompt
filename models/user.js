import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;

// In next.js, the route.js is only going to be created and running
// for the time that it is getting called

// There is one check we have to make

// The "models" object is provided by the Mongoose library and stores all the registered models
// If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable
// This prevents redefining the model and ensures that the existing model is reused

// If a model named "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model
// The newly created model is then assigned to the "user" variable

// const User = models.User || model("User", UserSchema); //the above is why we use the || function, we first check if a model named "User" already exists in the "models" Object
// // That's because the route gets called every time and the connection is established everytime from scratch, therefore we need this check

// export default User;


// We would use the lines below if we were working with a regular express.js app
// Which always has its backend server running

// const User = model("User", UserSchema);
// export default User;