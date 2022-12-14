export default function directToBookingPage(){

    const booking = document.querySelector("#booking");
    const layer = document.querySelector("#layer");
    const signinFrame = document.querySelector("#signin-frame");
    
    booking.addEventListener("click", () => {
        async function getUsernameData(url){
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };
        
        getUsernameData("/api/user/auth")
        .then(data => {
            if(data.data){
                location.href = "/booking";
            };
    
            if(data.data == null){
                layer.classList.add("active");
                signinFrame.classList.add("active");
            };
        })
        .catch((error) => {
            if(error.message == "data.data is null"){
                return null;
            };
            console.log("Error: " + error);
        });
    });
    
};