export default function selectCategory(){

    const results = document.querySelectorAll("div.select");
    
    results.forEach((result) => {
        result.addEventListener("click", (e) => {
            searchKeyword.value = e.target.attributes.name.value;
            categoryFrame.classList.toggle("is-active");
        });
    });

};