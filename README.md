# quantified-self-js-api

JavaScript backend for the quantified-self-client project. Both projects are part of Turing's Mod4 curriculum and the backend's introduction to JavaScript

### Base url is `https://qs-js-api.herokuapp.com/api/v1`

#### Food Resources

`GET /foods`
> Retrieves a list of all the foods that have been entered into the DB

`POST /foods`
> Adds a new food to the DB.
Format for posting new foods should look as follows:
`{ food: { name: "Name of food here", calories: "Calories here"} }`

`DELETE /foods/:id`
>Removes a certain food from the DB

`PATCH /foods/:id`
>Updates either the food name or the calorie amount
Format for updating existing foods should look as follows:
`{ food: { name: "Name of food here", calories: "Calories here"} }`

`GET /foods/:id`
>Returns a particular food

### Meal Resources

`GET /api/v1/meals` 
  > returns all the meals in the database along with their associated foods
  
`GET /api/v1/meals/:meal_id/foods` 
  > returns all the foods associated with the meal with an id specified by `:meal_id`
  
`POST /api/v1/meals/:meal_id/foods/:id` 
  > adds the food with `:id` to the meal with `:meal_id`
  This creates a new record in the MealFoods table to establish the relationship between this food and meal. 
  
`DELETE /api/v1/meals/:meal_id/foods/:id` 
  > removes the food with :id from the meal with `:meal_id`
  This deletes the existing record in the MealFoods table that creates the relationship between this food and meal. 



