// Attraction Button.
export default function handleAttractionButton(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            const attractionButton = document.querySelector("#attractionButton");
            const attractionID = location.href.split("/").pop();

            async function getBookingData(url, method){
                const response = await fetch(url, method);
                const data = await response.json();
                return data;
            };

            attractionButton.addEventListener("click", () => {
                loading.classList.add("show");
                getBookingData("/api/booking", {
                    method: "POST",
                    headers : {"Content-type": "application/json"},
                    body: JSON.stringify({
                        "attractionId": attractionID,
                        "date": attractionDate.value,
                        "time": attractionFee.attributes.attractionTime.value,
                        "price": attractionFee.textContent
                    })
                })
                .then(data => {
                    view.render(data);
                })
                .catch((error) => {
                    view.renderError(error);
                });
            });
        }
    };

    const view = {
        renderLoadingEffect: function(){
            loading.classList.add("show");
            setTimeout(() => {
                document.querySelector("#attractionContainer").style.display = "block";
                loading.classList.remove("show")
            }, 500);
        },
        render: function(data){
            if(data.message == "403 Forbidden."){
                loading.classList.remove("show");
                document.querySelector("#layer").classList.add("active");
                document.querySelector("#signin-frame").classList.add("active");
            };

            if(data.message == "Please select the booking date."){
                loading.classList.remove("show");
                setTimeout(() => alert("請選擇行程日期！"), 500);
            };

            if(data.ok == true){
                setTimeout(() => {
                    location.href = "/booking";
                    loading.classList.remove("show");
                }, 500);
            };
        },
        renderError: function(error){
            loading.classList.remove("show");
            console.log("Error(1): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
            view.renderLoadingEffect();
        }
    };
    controller.init();

};