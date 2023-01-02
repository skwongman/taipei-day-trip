export default function deleteBookingData(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){            
            document.querySelector("#bookingDelete").addEventListener("click", model.handleDeleteBooking);
        },
        handleDeleteBooking: async function(){
            loading.classList.add("show");
            async function getDeleteBookingData(url, method){
                const response = await fetch(url, method);
                const data = await response.json();
                return data;
            };

            await getDeleteBookingData("/api/booking", {
                method: "DELETE"
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

            if(data.ok == true){
                setTimeout(() => {
                    document.querySelector("#bookingContainer").style.display = "none";
                    document.querySelector("#bookingNoBooking").style.display = "block";
                    location.href = location.href;
                    loading.classList.remove("show");
                }, 500);
            };
        },
        renderError: function(error){
            console.log("Error:", error);
        }
    }

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

    return model.handleDeleteBooking;

};