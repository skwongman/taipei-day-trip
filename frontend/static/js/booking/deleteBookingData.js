export default function deleteBookingData(){

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
    
};