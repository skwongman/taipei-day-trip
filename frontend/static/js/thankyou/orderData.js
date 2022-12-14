export default function orderData(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            async function getOrderData(url){
                const response = await fetch(url);
                const data = await response.json();
                return data;
            };
            
            const orderNumber = location.href.split("=").pop();
            getOrderData("/api/orders/" + orderNumber)
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
        render: function(data){
            if(data.message == "403 Forbidden."){
                location.href = "/";
            };

            if(data.data != null){
                data = data.data;
                const orderContainer = document.querySelector("#orderContainer");
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
                const orderRemarks = document.querySelector("#orderRemarks");

                // orderContainer.style.display = "block";
                orderNumber.innerHTML = `??????????????? ${location.href.split("=").pop()}`
                orderStatus.innerHTML = `${(data.status) == 0 ? data.status = "<div class='order-status success'>??????????????? ????????????</div>" : data.status = "<div class='order-status unsuccess'>??????????????? ??????????????????"}</div>`;
                orderRemarks.textContent = `????????? ????????????????????????????????????????????????????????????????????????`;
                orderImage.innerHTML = `<img src="${data.trip.attraction.image}">`;
                orderAttraction.innerHTML = `<a href="/attraction/${data.trip.attraction.id}">?????????????????? ${data.trip.attraction.name}</a>`;
                orderDate.textContent = `${data.trip.date}`;
                orderTime.textContent = `${(data.trip.time == "morning") ? data.trip.time = "??????9????????????12???" : data.trip.time = "??????1??????4???"}`;
                orderFee.textContent = `????????? ${data.price} ???`;
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
            console.log("Error(22): " + error);
            location.href = "/";
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