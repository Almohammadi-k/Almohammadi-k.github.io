const appId = "7e142f63";
const appKey = "45766a73018d230cf44adb641016b227";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector ("#txtSearch");
const btnFind = document.querySelector(".btn");

btnFind.addEventListener("click",()=> loadRecipies(txtSearch.value));


txtSearch.addEventListener("keyup", (e) => {
    const inputVal = txtSearch.value;
    if (e.keyCode === 13) {
        loadRecipies(inputVal);
    }
});

const setScrollPosition = () => {
    recipeContainer.scrollTo ({ top: 0 , behavior: "smooth" });
};

function loadRecipies(type = "public") {
    const url = baseUrl + `&q=${type}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => renderRecipies(data.hits))
    .catch((error) => console.log(error))
    .finally(() => setScrollPosition());
}
loadRecipies();

const getRecipeStepsStr = (ingredientLines = []) => {
    let str = "";
    for(var step of ingredientLines) {
        str = str + `<li>${step}</li>`;
    }
    return str;
}

const renderRecipies = (recipeList = []) => {
    recipeContainer.innerHTML="";
    recipeList.forEach ((recipeObj) => {
        const {
            label: recipeTitle,
            ingredientLines,
            image: recipeImage,
        } = recipeObj.recipe;
        const recipeStepStr = getRecipeStepsStr(ingredientLines);

        const htmlStr = ` <div class="recipe">
        <div class="recipe-title">${recipeTitle} </div>
        <div class="recipe-image">
        <img src="${recipeImage}" />
        </div>
        <div class="recipe-text">
            <ul>
               ${recipeStepStr}
            </ul>
        </div>
        </div>`;
        recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
    });

};

