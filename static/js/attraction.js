// Fetch attraction API data on web initial load.
async function getAttractionData(){
    const pattern = {inputAttractionID: /[\d]/};
    const attractionID = window.location.href.split("/").pop();

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
    const container = document.querySelector("#content-container");
    const attractionContainer = document.createElement("div");
    attractionContainer.classList.add("attraction-container");

    attractionContainer.innerHTML = `
        <div class="attraction-frame">
            <div class="attraction">

                <div class="attraction-image-frame">
                    <div class="carousel">
                        <img id="prev" class="slide-button prev" src="/img/btn_leftArrow.png">
                        <img id="next" class="slide-button next" src="/img/btn_rightArrow.png">
                        <ul>
                            ${data.images.map((result) => {
                                return `<li class="slide"><img class="attraction-image" src="${result}"></li>`
                            }).join("")}
                        </ul>
                    </div>

                    <div class="navigation-dots">
                        <div class="single-dot active"></div>
                        ${data.images.slice(1).map(() => {
                            return `<div class="single-dot"></div>`
                        }).join("")}
                    </div>
                </div>

                <div class="attraction-plan">
                    <div class="attraction-name">${data.name}</div>
                    <div class="attraction-cat-mrt">${data.category} at ${data.mrt}</div>

                    <div class="attraction-background">
                        <div class="attraction-journey">訂購導覽行程</div>
                        <div class="attraction-intro">以此景點為中心的一日行程，帶您探索城市角落故事</div>

                        <div class="attraction-journey">
                            <span>選擇日期：</span>
                            <span><input class="attraction-date" type="date"></span>
                        </div>

                        <div class="attraction-journey">
                            <span>選擇時間：</span>
                            <input type="radio" name="choose-time" id="attraction-am" checked><span class="attraction-am">上半天</span>
                            <input type="radio" name="choose-time" id="attraction-pm"><span>下半天</span>
                        </div>

                        <div class="attraction-journey">
                            <span>導覽費用：</span>
                            <span>新台幣</span>
                                <span id="attraction-fee-am" class="attraction-fee-am active" value="2000">2000</span>
                                <span id="attraction-fee-pm" class="attraction-fee-pm" value="2500">2500</span>
                            <span>元</span>
                        </div>

                        <div class="attraction-button-background">
                            <div class="attraction-button">開始預約行程</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <hr class="separator"/>

        <div class="attraction-details-frame">
            <div class="attraction-details">
                <div class="attraction-title text">${data.description}</div>
                <div class="attraction-title">景點地址：</div>
                <div class="attraction-title text">${data.address}</div>
                <div class="attraction-title">交通方式：</div>
                <div class="attraction-title text">${data.mrt}</div>
            </div>
        </div>
    `

    container.appendChild(attractionContainer);
    
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