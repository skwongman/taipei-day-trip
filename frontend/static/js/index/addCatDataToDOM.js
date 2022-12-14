import selectCategory from "./selectCategory.js";

// Add fetched data to HTML DOM.
export default function addCatDataToDOM(catData){

    let isLoading = false;
    const searchContainer = document.querySelector("#category");

    for(let category of catData){
        isLoading = true;
        searchContainer.innerHTML += `<div class="select" name="${category}">${category}</div>`;
    };

    selectCategory();

};