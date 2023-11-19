function addRecipe() {
    var name = document.getElementById('recipeName').value;
    var ingredients = document.getElementById('ingredients').value;
    var instructions = document.getElementById('instructions').value;
    var imageInput = document.getElementById('imageInput');
    var imagePreview = document.getElementById('imagePreview');

    if (name && ingredients && instructions) {
        var recipe = {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null
        };

        // Save the recipe to local storage
        var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Clear the form
        document.getElementById('recipeForm').reset();
        imagePreview.innerHTML = '';

        // Refresh the recipe list
        displayRecipes();
    } else {
        alert('Please fill in all fields');
    }
}

function displayRecipes() {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    var recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    recipes.forEach(function(recipe, index) {
        var li = document.createElement('li');
        li.innerHTML = `
            <h3>${recipe.name}</h3>
            ${recipe.image ? `<img src="${recipe.image}" alt="Recipe Image" class="image-preview">` : ''}
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button class="del" onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(li);
    });
}

function deleteRecipe(index) {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

// Display existing recipes on page load
displayRecipes();
