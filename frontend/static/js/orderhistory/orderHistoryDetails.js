export default function orderHistoryDetails(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            async function getOrderHistoryDetails(url){
                const response = await fetch(url);
                const data = await response.json();
                return data;
            };
            
            const orderNumber = location.href.split("=").pop();
            getOrderHistoryDetails("/api/orders/" + orderNumber)
            .then(data => {
                view.render(data);
            })
            .catch((error) => {
                view.renderError(error);
            });
        }
    };

    const view = {
        renderLoadingEffect: function(){
            loading.classList.add("show");
            setTimeout(() => {
                document.querySelector("#orderContainer").style.display = "block";
                loading.classList.remove("show")
            }, 500);
        },
        renderHandlePrevButton: function(){
            document.querySelector("#orderDetailsPrevButton").addEventListener("click", () => {
                location.href = "/order";
            });
        },
        render: function(data){
            if(data.message == "403 Forbidden."){
                location.href = "/";
            };

            if(data.data != null){
                data = data.data;
                const orderAttraction = document.querySelector("#orderAttraction");
                const orderDate = document.querySelector("#orderDate");
                const orderTime = document.querySelector("#orderTime");
                const orderFee = document.querySelector("#orderFee");
                const orderVenue = document.querySelector("#orderVenue");
                const orderImage = document.querySelector("#orderImage");
                const orderNumber = document.querySelector("#orderNumber");
                const orderStatus = document.querySelector("#orderStatus");
                const orderContactName = document.querySelector("#orderContactName");
                const orderContactEmail = document.querySelector("#orderContactEmail");
                const orderContactNumber = document.querySelector("#orderContactNumber");

                orderNumber.innerHTML = `訂單編號： ${location.href.split("=").pop()}`
                orderStatus.innerHTML = `${(data.status) == 0 ? data.status = "<div class='order-status success'>付款狀態： 交易完成</div>" : data.status = "<div class='order-status unsuccess'>付款狀態： 交易尚未完成"}</div>`;
                orderImage.innerHTML = `<img src="${data.trip.attraction.image}">`;
                orderAttraction.innerHTML = `<a href="/attraction/${data.trip.attraction.id}">台北一日遊： ${data.trip.attraction.name}</a>`;
                orderDate.textContent = `${data.trip.date}`;
                orderTime.textContent = `${(data.trip.time == "morning") ? data.trip.time = "早上9點到中午12點" : data.trip.time = "下午1點到4點"}`;
                orderFee.textContent = `新台幣 ${data.price} 元`;
                orderVenue.textContent = `${data.trip.attraction.address}`;
                orderContactName.textContent = `${data.contact.name}`;
                orderContactEmail.textContent = `${data.contact.email}`;
                orderContactNumber.textContent = `${data.contact.phone}`;
            };
        },
        renderError: function(error){
            if(error.message == "data is undefined"){
                return null;
            };
            console.log("Error(11): " + error);
            location.href = "/";
        }
    };

    const controller = {
        init: function(){
            model.init();
            view.renderHandlePrevButton();
            view.renderLoadingEffect();
        }
    };
    controller.init();

};