export default function deleteBookingData(){

    const model = {
        init: function(){            
            document.querySelector("#bookingDelete").addEventListener("click", () => {
                async function getDeleteBookingData(url, method){
                    const response = await fetch(url, method);
                    const data = await response.json();
                    return data;
                };
        
                getDeleteBookingData("/api/booking", {
                    method: "DELETE"
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
                location.href = "/";
            };

            if(data.ok == true){
                document.querySelector("#bookingContainer").style.display = "none";
                document.querySelector("#bookingNoBooking").style.display = "block";
                location.href = location.href;
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

    /*
    const bookingDelete = document.querySelector("#bookingDelete");
    const bookingContainer = document.querySelector("#bookingContainer");
    const bookingNoBooking = document.querySelector("#bookingNoBooking");
    
    bookingDelete.addEventListener("click", () => {
        async function getDeleteBookingData(url, method){
            const response = await fetch(url, method);
            const data = await response.json();
            return data;
        };

        getDeleteBookingData("/api/booking", {
            method: "DELETE"
        })
        .then(data => {
            if(data.message == "403 Forbidden."){
                location.href = "/";
            };

            if(data.ok){
                bookingContainer.style.display = "none";
                bookingNoBooking.style.display = "block";
                location.href = location.href;
            };
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    });
    */
};