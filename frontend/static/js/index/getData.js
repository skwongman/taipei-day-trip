export default function getData(){

    let nextPage = [];
    let isLoading = false;
    const initLoadPageNum = 0;
    const loading = document.querySelector(".loading");
    const contentContainer = document.querySelector("#content-container");


    // Fetch attraction API data on web initial load.
    showLoading(initLoadPageNum);
    loading.classList.add("showInMiddle");


    // Loading data.
    function showLoading(pageNum = nextPage){
        loading.classList.add("show");
        setTimeout(() => {
            getData(pageNum, searchKeyword.value);
            isLoading = false;
        }, 500);
    };

    async function getData(page, keyword){
        if(keyword == ""){
            var url = `/api/attractions?page=${page}`;
        }
        else{
            var url = `/api/attractions?page=${page}&keyword=${keyword}`;
        };
    
        const response = await fetch(url);
        const data = await response.json();
        if(data.error == true) console.log(data.message);
        nextPage = data.nextPage;
    
        if(data.data.length == 0){
            isLoading = true;
            contentContainer.innerHTML = "<div class='no-result'>抱歉，找不到任何搜尋結果。</div>"
            loading.classList.remove("show");
        }
        else{
            isLoading = true;
            addDataToDOM(data.data);
        }
    };
    
    
    // Add fetched data to HTML DOM.
    function addDataToDOM(data) {
        data.forEach(attraction => {
        contentContainer.innerHTML += `
                <div class="content">
                    <div class="images" id="${attraction.id}">
                        <a href="/attraction/${attraction.id}"><img src="${attraction.images[0]}"></a>
                    <div>
                <div class="content-title">
                    <div>${attraction.name}</div>
                </div>
                <div class="content-text">
                    <div class="content-text-left">${attraction.mrt}</div>
                    <div class="content-text-right">${attraction.category}</div>
                </div>
            `;
        });
    
        loading.classList.remove("show");
    }
    
    
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
    
    
    // Search button event handling.
    function searchButton(){
        const searchButton = document.querySelector("#search-button");
        searchButton.addEventListener("click", () => {
            var nextPage = [];
            var initPage = 0;
            const pattern = {searchInput: /[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]/};
            isLoading = true;
    
            contentContainer.textContent = "";
            loading.classList.add("showInMiddle");
    
            if(nextPage != null && isLoading && pattern["searchInput"].test(searchKeyword.value) && searchKeyword.value != ""){
                isLoading = false;
                showLoading(initPage);
                loading.classList.add("showInMiddle");
            }
            else{
                isLoading = false;
                loading.classList.add("show");
                setTimeout(() => {
                    contentContainer.innerHTML = "<div class='no-result'>請輸入景點名稱查詢。</div>";
                    loading.classList.remove("show");
                }, 500);
            };
        });
    };
    searchButton();

};