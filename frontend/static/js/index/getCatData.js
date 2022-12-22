export default function getCatData(){

    const model = {
        init: function(){
            async function addCatDataToDOM(url){
                const response = await fetch(url);
                const data = await response.json();
                return data.data;
            };
        
            addCatDataToDOM("/api/categories")
            .then(data => {
                view.render(data);
                view.renderSelectCategory();
            })
            .catch((error) => {
                view.renderError(error);
            });
        }
    };

    const view = {
        render: function(data){
            for(let category of data){
                let isLoading = false;
                isLoading = true;
                document.querySelector("#category").innerHTML += `
                    <div class="select" name="${category}">${category}</div>
                `;
            };
        },
        renderSelectCategory: function(){
            document.querySelectorAll("div.select").forEach((result) => {
                result.addEventListener("click", (e) => {
                    searchKeyword.value = e.target.attributes.name.value;
                    categoryFrame.classList.toggle("is-active");
                });
            });
        },
        renderError: function(error){
            console.log("Error(13): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};