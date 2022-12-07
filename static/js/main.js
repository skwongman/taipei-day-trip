let nextPage = [];
let isLoading = false;
const initLoadPageNum = 0;
const contentContainer = document.getElementById("content-container");
const loading = document.querySelector(".loading");


// ################################################### Main Content Related ###################################################


// Fetch attraction API data on web initial load.
showLoading(initLoadPageNum);
loading.classList.add("showInMiddle");

async function getData(page, keyword){
    (keyword == "") ?
    url = `http://52.205.132.168:3000/api/attractions?page=${page}` :
    url = `http://52.205.132.168:3000/api/attractions?page=${page}&keyword=${keyword}`;

    const response = await fetch(url);
    const data = await response.json();
    if(data.error == true) console.log(data.message);
    nextPage = data.nextPage;

    isLoading = true;
    (data.length == 0) ?
    contentContainer.innerHTML = "<div class='no-result'>抱歉，找不到任何搜尋結果。</div>" :
    addDataToDOM(data.data);
};


// Add fetched data to HTML DOM.
function addDataToDOM(data){
    const contentOuterFrame = document.createElement("div");
    contentOuterFrame.classList.add("content-outer-frame");

    const contentInnerFrame = document.createElement("div");
    contentInnerFrame.classList.add("content-inner-frame");
    contentOuterFrame.appendChild(contentInnerFrame);
    
    for(let attraction of data){
        contentInnerFrame.innerHTML += `
            <div class="content">
                <a href="http://52.205.132.168:3000/attraction/${attraction.id}">
                    <div class="images" id="${attraction.id}"><img src="${attraction.images[0]}"><div>
                </a>
            <div class="content-title">
                <div>${attraction.name}</div>
            </div>
            <div class="content-text">
                <div class="content-text-left">${attraction.mrt}</div>
                <div class="content-text-right">${attraction.category}</div>
            </div>
            
        `;
    };

    contentContainer.appendChild(contentOuterFrame);
    loading.classList.remove("show");
};


// Loading data.
function showLoading(pageNum = nextPage) {
    loading.classList.add("show");
    setTimeout(() => {
        getData(pageNum, searchKeyword.value);
        isLoading = false;
    }, 1000);
};


// Infinite scroll loading effect.
function scrolling(){
    window.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if(scrollHeight - 300 <= (clientHeight + scrollTop)){
            if(nextPage != null && isLoading){
                isLoading = false;
                showLoading();
                loading.classList.remove("showInMiddle");
            };
        };
    });
};
scrolling();


// ################################################### Button related ###################################################


// Search button event handling.
function searchButton(){
    const searchButton = document.querySelector("#search-button");

    searchButton.addEventListener("click", () => {
        var nextPage = [];
        var initPage = 0;
        const pattern = {searchInput: /[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]/};

        contentContainer.textContent = "";
        loading.classList.add("showInMiddle");

        if(nextPage != null && isLoading && pattern["searchInput"].test(searchKeyword.value) && searchKeyword.value != ""){
            isLoading = false;
            showLoading(initPage);
            loading.classList.add("showInMiddle");
        }
        else{
            loading.classList.add("show");
            setTimeout(() => {
                contentContainer.innerHTML = "<div class='no-result'>請輸入景點名稱查詢。</div>";
                loading.classList.remove("show");
            }, 1000);
        };
    });
};
searchButton();


// Fetch category API data on web initial load. 
async function getCatData(){
    const response = await fetch("http://52.205.132.168:3000/api/categories");
    const catData = await response.json();
    if(catData.error == true) console.log(catData.message);
    addCatDataToDOM(catData.data);
};
getCatData();


// Add fetched data to HTML DOM.
function addCatDataToDOM(catData){
    const searchContainer = document.getElementById("search-container");

    var categoryFrame = document.createElement("div");
    categoryFrame.setAttribute("id", "categoryFrame");

    var categoryContent = document.createElement("div");
    categoryContent.setAttribute("id", "category");
    categoryFrame.appendChild(categoryContent);

    for(let i of catData){
        isLoading = true;
        categoryContent.innerHTML += `<div class="select" name="${i}">${i}</div>`;
    };

    searchContainer.appendChild(categoryFrame);
    selectCategory();
};


// Pop-up menu.
function popUpMenu(){
    searchKeyword.addEventListener("click", (e) => {
        const categoryFrame = document.getElementById("categoryFrame");
        categoryFrame.classList.toggle("is-active");
        e.stopPropagation();
    });

    window.addEventListener("click", (e) => {
        if(e.target != document.querySelector("div.a")){
            categoryFrame.classList.remove("is-active");
        };
    });
};
popUpMenu();


// Select category item event handling.
function selectCategory(){
    const results = document.querySelectorAll("div.select");
    results.forEach((result) => {
        result.addEventListener("click", (e) => {
            searchKeyword.value = e.target.attributes.name.value;
            categoryFrame.classList.toggle("is-active");
        });
    });
};