document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById("search-input").value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    document.querySelector('.meal-details').innerHTML = "";
    document.getElementById('search-results').innerHTML = "";
    // Getting Data 
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const meals = data.meals;
            let searchResults = '';
            meals.forEach(element => {
                searchResults += `<a href="#home">
                <div class="col" onclick="ingredient('${element.strMeal}')">
            <div class="card">
                <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.strMeal}</h5>
                    
                </div>
            </div>
        </div></a>`;
            });
            document.getElementById('search-results').innerHTML = searchResults;
            document.getElementById("search-input").value = '';
            document.querySelector('.meal-details').innerHTML = '';
        }).catch(data => {
            document.querySelector('.meal-details').innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show w-75 m-auto" role="alert">
        There is no such food. Please search another food.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        })

})

let ingredient = (mealName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const meals = data.meals;
            let mealDetails = '';
            meals.forEach(element => {
                if (element.strMeal === mealName) {
                    document.querySelector('.meal-details').innerHTML = `<div class="card mb-3 w-50 m-auto">
                <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${element.strMeal}</h4>
                    <h5>Ingredients: </h5>
                    <ul>
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        <li>${element.strIngredient5}</li>
                        <li>${element.strIngredient6}</li>
                    </ul>
                </div>
              </div>`;
                }
            })
        })
}