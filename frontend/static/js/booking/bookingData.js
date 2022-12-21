export default function bookingData(){

    const model = {
        init: function(){
            async function getBookingData(url){
                const response = await fetch(url);
                const data = await response.json();
                return data;
            };
            
            getBookingData("/api/booking")
            .then(data => {
                view.render(data);
            })
            .catch((error) => {
                viewError.render(error);
            });
            
            return getBookingData("/api/booking");
        }
    };

    const view = {
        render: function(data){
            if(data.message == "403 Forbidden."){
                location.href = "/";
            };
    
            if(data.data){
                const bookingAttraction = document.querySelector("#bookingAttraction");
                const bookingDate = document.querySelector("#bookingDate");
                const bookingTime = document.querySelector("#bookingTime");
                const bookingFee = document.querySelector("#bookingFee");
                const bookingVenue = document.querySelector("#bookingVenue");
                const confirmAmount = document.querySelector("#confirmAmount");
                const bookingImage = document.querySelector("#bookingImage");
                const bookingContainer = document.querySelector("#bookingContainer");
                const bookingNoBooking = document.querySelector("#bookingNoBooking");

                data = data.data;
                bookingContainer.style.display = "block";
                bookingNoBooking.style.display = "none";
                bookingImage.innerHTML = `<img src = "${data.attraction.image}">`;
                bookingAttraction.innerHTML = `<a href = "/attraction/${data.attraction.id}"> 台北一日遊： ${data.attraction.name}</a>`;
                bookingDate.textContent = `${data.date}`;
                bookingTime.textContent = `${(data.time == "morning") ? data.time = "早上9點到中午12點" : data.time = "下午1點到4點"}`;
                bookingFee.textContent = `新台幣 ${data.price} 元`;
                bookingVenue.textContent = `${data.attraction.address}`;
                confirmAmount.textContent = `總價：新台幣 ${bookingFee.textContent.slice(4, 9)} 元`;
            };
        },
        renderError: function(error){
            if(error.message == "data is undefined"){
                return null;
            };
            console.log("Error(2): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

    return model.init();

};