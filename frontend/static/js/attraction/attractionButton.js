// Attraction Button.
export default function handleAttractionButton(){

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
        render: function(data){
            if(data.message == "403 Forbidden."){
                document.querySelector("#layer").classList.add("active");
                document.querySelector("#signin-frame").classList.add("active");
            };

            if(data.message == "Please select the booking date."){
                alert("請選擇行程日期！");
            };

            if(data.ok == true){
                location.href = "/booking";
            };
        },
        renderError: function(error){
            console.log("Error(1): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};