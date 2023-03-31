let recipieNameRef = document.getElementById("recipe-name");
let searchBtn = document.getElementById("search-btn");
let key = "lH4fqwRqbVzpTd61UgjSwg==reAshXjUAwWIGMel";
let result = document.getElementById("result");

// function to fetch data from api
let getRecipie = () => {
  let recipeName = recipieNameRef.value;
  let apiUrl = `https://api.api-ninjas.com/v1/recipe?query=${recipeName}&apikey=${key}`;

  if (recipeName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a recipe name</h3>`;
  } else {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          result.innerHTML = `
            <h2>${data.result.name}</h2>
            <p>Preparation Time: ${data.result.preparation_time}</p>
            <p>Cooking Time: ${data.result.cooking_time}</p>
            <h3>Ingredients</h3>
            <ul>
              ${data.result.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Instructions</h3>
            <ol>
              ${data.result.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
            </ol>
          `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.message}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      });
  }
}

// add an event listener to the search button to call the getRecipie function when clicked
searchBtn.addEventListener("click", getRecipie);
window.addEventListener("load", getRecipie);