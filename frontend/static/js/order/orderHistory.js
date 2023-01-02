export default function orderHistory(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            view.renderHandleOrderPrevButton();
            
            async function getOrderHistory(url){
                const response = await fetch(url);
                const data = await response.json();
                return data;
            };
        
            getOrderHistory("/api/order_history")
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
                document.querySelector("#orderContainer").style.visibility = "visible";
                loading.classList.remove("show")
            }, 500);
        },
        renderHandleOrderPrevButton: function(){
            document.querySelector("#orderPrevButton").addEventListener("click", () => {
                location.href = "/profile";
            });
        },
        render: function(data){
            if(data.data == ""){
                document.querySelector("#orderNoOrder").textContent = "您目前沒有任何訂單，請到本站首頁開始選擇您的行程。"
            };
    
            if(data.message == "403 Forbidden."){
                location.href = "/";
            };
    
            if(data.data != null){
                data.data.map(result => {
                    const date = new Date(result.order_record_time);
                    const isoString = date.toISOString();
                    const [datePart, timePart] = isoString.split("T");
                    const [hour, minute] = timePart.split(":");
                    const formattedDate = `${datePart},${hour}:${minute}`;
                    const orderDateTime = (formattedDate.split(",")[0] + ", " + formattedDate.split(",")[1])
    
                    document.querySelector("#orderDetailsContainer").innerHTML += `
                        <a href="${"/order/history?number=" + result.number}">
                            <div class="order-details">
                                <div class="order-image-frame">
                                    <img id="orderImage" class="order-image" src="${result.trip.attraction.image}">
                                </div>
                                <div class="order-summary">
                                    <div class="order-summary-name">台北一日遊： ${result.trip.attraction.name}</div>
                                    <div class="order-summary-order-number">訂單編號： ${result.number}</div>
                                    <div class="order-summary-date">訂單日期： ${orderDateTime}</div>
                                    <div>${(result.status == 0) ? result.status = "<span class='order-status success'>付款狀態： 交易完成</span>" : result.status = "<span class='order-status unsuccess'>付款狀態： 交易尚未完成</span>"}</div>
                                </div>
                            </div>
                        </a>
                    `;
                });
            };
        },
        renderError: function(error){
            console.log("Error(20): " + error);
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