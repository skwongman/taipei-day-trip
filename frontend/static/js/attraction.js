// Fetch attraction API data on web initial load.
async function getAttractionData(){
    const pattern = {inputAttractionID: /[\d]/};
    const attractionID = location.href.split("/").pop();

    // Input of attraction ID other then numbers is not allowed.
    if(!pattern["inputAttractionID"].test(attractionID)) location.href = "/";

    url = "http://52.205.132.168:3000/api/attraction/" + attractionID;
    const response = await fetch(url);
    const data = await response.json();
    if(data.error == true) console.log(data.message);

    (data.message == "Attraction ID Not Found") ?
    location.href = "/" :
    addAttractionDatatoDOM(data.data);
};
getAttractionData();


// Add fetched data to HTML DOM.
function addAttractionDatatoDOM(data){
    const attractionImage = document.querySelector("#attraction-image");
    const navigationDots = document.querySelector("#navigation-dots");
    const attractionName = document.querySelector("#attraction-name");
    const attractionCatMrt = document.querySelector("#attraction-cat-mrt");
    const attractionDescription = document.querySelector("#attraction-description");
    const attractionAddress = document.querySelector("#attraction-address");
    const attractionMRT = document.querySelector("#attraction-mrt");

    attractionImage.innerHTML = `
        ${data.images.map((result) => {
            return `<li class="slide"><img class="attraction-image" src="${result}"></li>`
        }).join("")}
    `    

    navigationDots.innerHTML = `
        <div id="single-dot" class="single-dot active"></div>
        ${data.images.slice(1).map(() => {
            return `<div class="single-dot"></div>`
        }).join("")}
    `

    attractionName.textContent = `${data.name}`;
    attractionCatMrt.textContent = `${data.category} at ${data.mrt}`;
    attractionDescription.textContent = `${data.description}`;
    attractionAddress.textContent = `${data.address}`;
    attractionMRT.textContent = `${data.mrt}`;

    imageSlider();
    attractionFee();
};


// Image slider
function imageSlider(){
    var counter = 0;
    const navigationDots = document.querySelector(".navigation-dots");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    const images = document.querySelectorAll("img.attraction-image");

    function slideImages(){
        images.forEach((slide) => {
            slide.style.display = "none";
        });
        images[counter].style.display = "block";
        navDots();
    };
    slideImages();

    function navDots(){
        const currentDot = document.querySelector(".single-dot.active");
        currentDot.classList.remove("active");
        navigationDots.children[counter].classList.add("active");
    };

    function slideButton(){
        prevButton.addEventListener("click", () => {
            (counter == 0) ?
            (counter = images.length - 1) :
            counter --
            slideImages();
        });
    
        nextButton.addEventListener("click", () => {
            (counter == images.length - 1) ?
            counter = 0 :
            counter ++
            slideImages();
        });
    };
    slideButton();
};


// Attraction Fee Selection Buttons.
function attractionFee(){
    const attractionAM = document.querySelector("#attraction-am");
    const attractionPM = document.querySelector("#attraction-pm");
    const attractionFeeAM = document.querySelector(".attraction-fee-am");
    const attractionFeePM = document.querySelector(".attraction-fee-pm");

    attractionAM.addEventListener("click", () => {
        attractionFeePM.classList.remove("active");
        attractionFeeAM.classList.add("active");
    });

    attractionPM.addEventListener("click", () => {  
        attractionFeeAM.classList.remove("active");
        attractionFeePM.classList.add("active");
    });
};