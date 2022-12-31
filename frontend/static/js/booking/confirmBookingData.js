import deleteBookingData from "./deleteBookingData.js";

export default function confirmBookingData(cardPrimeNumber){

    const loading = document.querySelector(".loading");

    const model = {
        init: async function(){
            const bookingFee = document.querySelector("#bookingFee").textContent.slice(4,8);
            const bookingAttractionID = document.querySelector("#bookingAttraction a").href.split("/").pop();
            const bookingAttractionName = document.querySelector("#bookingAttraction").innerText.split(" ").pop();
            const bookingVenue = document.querySelector("#bookingVenue").textContent;
            const bookingImage = document.querySelector("#bookingImage img").src;
            const bookingDate = document.querySelector("#bookingDate").textContent;
            const bookingTime = document.querySelector("#bookingTime").textContent;

            loading.classList.add("show");

            async function getOrderData(url, method){
                const response = await fetch(url, method);
                const data = await response.json();
                return data;
            };
        
            getOrderData("/api/orders", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    "prime": cardPrimeNumber,
                    "order": {
                        "price": bookingFee,
                        "trip": {
                            "attraction": {
                                "id": bookingAttractionID,
                                "name": bookingAttractionName,
                                "address": bookingVenue,
                                "image": bookingImage
                            },
                            "date": bookingDate,
                            "time": bookingTime
                        },
                        "contact": {
                            "name": contactName.value,
                            "email": contactEmail.value,
                            "phone": contactNum.value
                        }
                    }
                })
            })
            .then(data => {
                view.render(data);
            })
            .catch((error) => {
                view.renderError(error);
            });
        }
    };

    const view = {
        render: async function(data){
            if(data.message == "403 Forbidden."){
                setTimeout(() => {
                    location.href = "/";
                    loading.classList.remove("show");
                }, 500);
            };

            if(data.data != null || data.message == "Transaction error."){
                await deleteBookingData()();
                location.href = "/thankyou?number=" + data.data.number;
                loading.classList.remove("show");
            };

            if(data.message == "Cannot get prime."){
                loading.classList.remove("show");
                setTimeout(() => alert("請輸入有效信用卡付款資訊！"), 500);
            };

            if(data.message == "Get prime error."){
                loading.classList.remove("show");
                setTimeout(() => alert("發生錯誤！"), 500);
            };
        },
        renderError: function(error){
            loading.classList.remove("show");
            console.log("Error(3): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};