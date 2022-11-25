let nextPage = [];
let isLoading = false;
let contentContainer = document.getElementById("content-container");
let loading = document.querySelector(".loading");
let searchButtom = document.querySelector("#search-btn");
let searchContainer = document.getElementById("search-container");


// ################################################### Main Content Related ###################################################


// Fetch attraction API data on web initial load.
showLoading();
loading.classList.add("showInMiddle");


async function getData(page = 0, keyword = ""){
    const response = await fetch(`http://52.205.132.168:3000/api/attractions?page=${page}&keyword=${keyword}`);
    const data = await response.json();
    nextPage = data.nextPage;
    addDataToDOM(data.data);
};


// Add fetched data to HTML DOM.
function addDataToDOM(data){
    var contentOuterFrame = document.createElement("div");
    contentOuterFrame.classList.add("content-outer-frame");

    var contentInnerFrame = document.createElement("div");
    contentInnerFrame.classList.add("content-inner-frame");
    contentOuterFrame.appendChild(contentInnerFrame);

    if(data.length == 0){
        contentContainer.innerHTML = "<div class='no-result'>抱歉，找不到任何搜尋結果。</div>"
    }
    else{
        for(let i of data){
            contentInnerFrame.innerHTML += `
                <div class="content" onmouseover="contentColorChange(this)" onmouseout="contentColorChangeBack(this)">
                <img src="${i.images[0]}">
                <div class="content-text">
                    <div class="content-text-left">${i.mrt}</div>
                    <div class="content-text-right">${i.category}</div>
                </div>
                <div class="content-title">
                    <div>${i.name}</div>
                </div>
            `;
        };
    };

    contentContainer.appendChild(contentOuterFrame);
    loading.classList.remove("show");
};


// Loading data.
function showLoading(pageNum = nextPage) {
    loading.classList.add("show");
    setTimeout(() => {
        isLoading = false;
        getData(pageNum, searchKeyword.value)
    }, 1000)
};


// Infinite scroll loading effect.
function scrolling(){
    window.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if(scrollHeight - 300 <= (clientHeight + scrollTop)){
            if(nextPage != null && !isLoading){
                !async function(){
                    isLoading = true;
                    await showLoading();
                    loading.classList.remove("showInMiddle");
                }();
            };
        };
    });
};
scrolling();


// Mouse move on and out effect.
function contentColorChange(e){
    e.style.opacity = "0.8";
};

function contentColorChangeBack(e){
    e.style.opacity = "1";
};


// ################################################### Button related ###################################################


// Search button event handling.
function searchBtn(){
    searchButtom.addEventListener("click", (e) => {
        var nextPage = [];
        var initPage = 0;
        const pattern = {
            searchInput: /[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]/
        };

        contentContainer.textContent = "";
        loading.classList.add("showInMiddle");

        if(nextPage != null && !isLoading && pattern["searchInput"].test(searchKeyword.value) && searchKeyword.value != ""){
            !async function(){
                isLoading = true;
                await showLoading(initPage);
                loading.classList.add("showInMiddle");
                e.preventDefault();
            }();
        }
        else{
            loading.classList.add("show");
            setTimeout(() => {
                contentContainer.innerHTML = "<div class='no-result'>請輸入景點名稱查詢。</div>";
                loading.classList.remove("show");
                e.preventDefault();
            }, 1000);
        };
    });
};
searchBtn();


// Fetch category API data on web initial load. 
async function getCatData(){
    const response = await fetch("http://52.205.132.168:3000/api/categories");
    const catData = await response.json();
    addCatDataToDOM(catData.data);
};
getCatData();


// Add fetched data to HTML DOM.
function addCatDataToDOM(catData){
    var categoryFrame = document.createElement("div");
    categoryFrame.setAttribute("id", "categoryFrame");

    var categoryContent = document.createElement("div");
    categoryContent.setAttribute("id", "category");
    categoryFrame.appendChild(categoryContent);

    for(let i of catData){
        categoryContent.innerHTML += `
            <div class="select" onmouseover="colorChange(this)" onmouseout="colorChangeBack(this)" name="${i}">${i}</div>
        `;
    };

    searchContainer.appendChild(categoryFrame);
    selectCategory();
};


// Pop-up menu.
function popUpMenu(){
    searchKeyword.addEventListener("click", (e) => {
        let categoryFrame = document.getElementById("categoryFrame");
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


// Mouse move on and out effect.
function colorChange(e){
    e.style.backgroundColor = "#E8E8E8";
    e.style.fontWeight = "700";
};

function colorChangeBack(e){
    e.style.backgroundColor = "white";
    e.style.fontWeight = "500";
};