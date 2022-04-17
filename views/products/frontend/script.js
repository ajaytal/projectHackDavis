const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('book');
const mealDetailsContent = document.querySelector('.book-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', mealRecipeModal);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    /*fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {*/
        let html = "";
        /*if(data.meals){
            data.meals.forEach(meal => {*/
                html += `
                    <div class = "book-item" data-id = "caterpillar">
                        <div class = "book-img">
                            <img src = "caterpillar.jpeg" alt = "food">
                        </div>
                        <div class = "book-name">
                            <h3>The Very Hungry Caterpillar</h3>
                            <a href = "#" class = "recipe-btn">Checkout Book</a>
                        </div>
                    </div>
                `;
           /* });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find the book!";
            mealList.classList.add('notFound');
        }*/

        mealList.innerHTML = html;
    //});
}


// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h1 class = "Check-out">Checkout:</h2>
        <h2 class = "recipe-title">The Hungry Caterpillar</h2>
        <form>
            <label for="check-out-name">Name:</label><br>
            <input type="text" id="fname" name="name" placeholder ="Enter a name"><br>
            <label for="check-out-address">Aparment:</label><br>
            <input type="text" id="c-address" name="address" placeholder ="Enter an address"><br>
            <label for="check-out-number">Phone Number:</label><br>
            <input type="text" id="c-number" name="address" placeholder ="Enter an address">
        </form>
        
        
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}