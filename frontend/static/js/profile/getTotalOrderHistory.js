export default function getTotalOrderHistory(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            async function orderHistory(url){
                const response = await fetch(url);
                const data = response.json();
                return data;
            };
        
            orderHistory("/api/order_history")
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
                document.querySelector("#profileOuterContainer").style.display = "block";
                loading.classList.remove("show")
            }, 500);
        },
        render: function(data){
            if(data.message == "403 Forbidden."){
                location.href = "/";
            };

            if(data.data != null){
                document.querySelector("#profileContainer").style.display = "block";

                if(data.data.length == 0){
                    document.querySelector("#profileTotalOrder").textContent = "您目前沒有任何訂單";
                }
                else{
                    document.querySelector("#profileTotalOrder").textContent = `${data.data.length} 個`;
                };
            };
        },
        renderError: function(error){
            console.log("Error(15): " + error);
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