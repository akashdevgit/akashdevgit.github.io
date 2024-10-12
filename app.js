document.getElementById('add-ingredient').addEventListener('click', function() {
    const ingredientsDiv = document.getElementById('ingredients');
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.innerHTML = `
        <input type="text" class="ingredient-name" placeholder="Ingredient Name">
        <input type="number" class="ingredient-calories" placeholder="Calories per 100g">
        <input type="number" class="ingredient-quantity" placeholder="Quantity in grams">
    `;
    ingredientsDiv.appendChild(newIngredientDiv);
});

document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('recipe-name').value;
    const ingredientNames = document.querySelectorAll('.ingredient-name');
    const ingredientCalories = document.querySelectorAll('.ingredient-calories');
    const ingredientQuantities = document.querySelectorAll('.ingredient-quantity');

    let totalCalories = 0;
    const ingredients = [];

    ingredientNames.forEach((ingredientName, index) => {
        const name = ingredientName.value;
        const caloriesPer100g = Number(ingredientCalories[index].value) || 0;
        const quantityInGrams = Number(ingredientQuantities[index].value) || 0;
        const calories = (caloriesPer100g / 100) * quantityInGrams;
        ingredients.push({ name, calories, quantity: quantityInGrams });
        totalCalories += calories;
    });

    const recipe = { name, ingredients, totalCalories };
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    displayRecipes();

    document.getElementById('recipe-form').reset();
});

function displayRecipes() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h2>${recipe.name}</h2>
            <p>Ingredients:</p>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient.name}: ${ingredient.quantity}g (${ingredient.calories.toFixed(2)} calories) </li>`).join('')}
            </ul>
            <p>Total Calories: ${recipe.totalCalories.toFixed(2)}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(recipeElement);
    });
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

displayRecipes();
