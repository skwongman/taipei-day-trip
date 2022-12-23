import imageSlider from "./imageSlider.js";
import attractionFeeSelection from "./attractionFeeSelection.js";

export default function addAttractionDatatoDOM(data){

    const view = {
        render: function(){
            const attractionImage = document.querySelector("#attraction-image");
            const navigationDots = document.querySelector("#navigation-dots");
            const attractionName = document.querySelector("#attraction-name");
            const attractionCatMrt = document.querySelector("#attraction-cat-mrt");
            const attractionDescription = document.querySelector("#attraction-description");
            const attractionAddress = document.querySelector("#attraction-address");
            const attractionMRT = document.querySelector("#attraction-mrt");
        
            attractionImage.innerHTML = `
                ${data.images.map((result) => {
                    return `
                        <li class="slide">
                            <img class="attraction-image" src="${result}">
                        </li>
                    `
                }).join("")}
            `    
        
            navigationDots.innerHTML = `
                <div id="single-dot" class="single-dot active"></div>
                ${data.images.slice(1).map(() => {
                    return `
                        <div class="single-dot"></div>
                    `
                }).join("")}
            `
        
            attractionName.textContent = `${data.name}`;
            attractionCatMrt.textContent = `${data.category} at ${data.mrt}`;
            attractionDescription.textContent = `${data.description}`;
            attractionAddress.textContent = `${data.address}`;
            attractionMRT.textContent = `${data.mrt}`;
        
            imageSlider();
            attractionFeeSelection();
        }
    };

    const controller = {
        init: function(){
            view.render();
        }
    };
    controller.init();

};