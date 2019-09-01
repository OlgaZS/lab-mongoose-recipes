const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// ### Iteration 1 - Recipe Schema

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef ", "UltraPro Chef "]
  },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: { type: String, default: "images/default-avatar.png" },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

// ### Iteration 2 - Create a recipe

const Recipe = mongoose.model("Recipe", recipeSchema);
// module.exports = Recipe;

Recipe.create({
  title: "Pasta Carbonara",
  level: "Easy Peasy",
  ingredients: ["spaghetti", "panceta", "cheese", "eggs", "butter"],
  cuisine: "Italian",
  dishType: "Dish",
  image:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1001491_11.jpg?itok=-ns0A_kt",
  creator: "Angela Nilsen"
})
  .then(recipe => {
    console.log("Recipe created and its title is: ", recipe.title);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

// ### Iteration 3 - Insert Many recipes

Recipe.insertMany(data)
  .then(() => {
    console.log("The recipes were created and saved: ");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

//### Iteration 4 - Update recipe

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(recipe => {
    console.log("This recipe has been updated: Rigatoni alla Genovese");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

//### Iteration 5 - Remove a recipe

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => {
    console.log("The recipes was deleted!");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

//### Iteration 6 - Close the Database
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
