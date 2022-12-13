import addAttractionDatatoDOM from "./addAttractionDataToDOM.js";

// Fetch attraction API data on web initial load.
export default async function getAttractionData(){

    const pattern = {inputAttractionID: /[\d]/};
    const attractionID = location.href.split("/").pop();

    // Input of attraction ID other then numbers is not allowed.
    if(!pattern["inputAttractionID"].test(attractionID)) location.href = "/";

    const url = "/api/attraction/" + attractionID;
    const response = await fetch(url);
    const data = await response.json();
    if(data.error == true) console.log(data.message);

    (data.message == "Attraction ID Not Found") ?
    location.href = "/" :
    addAttractionDatatoDOM(data.data);
    
};