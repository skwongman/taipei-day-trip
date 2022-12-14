import addCatDataToDOM from "./addCatDataToDOM.js";

// Fetch category API data on web initial load. 
export default async function getCatData(){

    const response = await fetch("/api/categories");
    const catData = await response.json();

    if(catData.error == true) console.log(catData.message);
    
    addCatDataToDOM(catData.data);

};