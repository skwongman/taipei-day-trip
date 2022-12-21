import bookingData from "./bookingData.js";

export default function confirmBookingData(cardPrimeNumber){

    const model = {
        init: async function(){
            const data = await bookingData();
            if(!data.data) return null;
            const orderData = data.data;
        
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
                        "price": orderData.price,
                        "trip": {
                            "attraction": {
                                "id": orderData.attraction.id,
                                "name": orderData.attraction.name,
                                "address": orderData.attraction.address,
                                "image": orderData.attraction.image
                            },
                            "date": orderData.date,
                            "time": orderData.time
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
        render: function(data){
            if(data.message == "403 Forbidden."){
                location.href = "/";
            };

            if(data.data != null || data.message == "Transaction error."){
                location.href = "/thankyou?number=" + data.data.number;
            };

            if(data.message == "Cannot get prime."){
                alert("請輸入有效信用卡付款資訊！");
            };

            if(data.message == "Get prime error."){
                alert("發生錯誤！");
            };
        },
        renderError: function(error){
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