// Category Pop-up menu.
export default function categoryPopUpMenu(){

    searchKeyword.addEventListener("click", (e) => {
        const categoryFrame = document.querySelector("#categoryFrame");
        categoryFrame.classList.toggle("is-active");
        e.stopPropagation();
    });

    window.addEventListener("click", (e) => {
        if(e.target != document.querySelector("div.a")){
            categoryFrame.classList.remove("is-active");
        };
    });
    
};