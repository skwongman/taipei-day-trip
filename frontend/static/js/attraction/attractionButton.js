// Attraction Button.
export default function handleAttractionButton(){

    const attractionButton = document.querySelector("#attractionButton");
    const attractionID = location.href.split("/").pop();
    const layer = document.querySelector("#layer");
    const signinFrame = document.querySelector("#signin-frame");
    
    attractionButton.addEventListener("click", () => {
        async function getBookingData(url, method){
            const response = await fetch(url, method);
            const data = await response.json();
            return data;
        };
    
        getBookingData("/api/booking", {
            method: "POST",
            headers : {"Content-type": "application/json"},
            body: JSON.stringify({
                "bookingID": attractionID,
                "bookingDate": attractionDate.value,
                "bookingTime": attractionFee.attributes.attractionTime.value,
                "bookingFee": attractionFee.textContent
            })
        })
        .then(data => {
            if(data.message == "403 Forbidden."){
                layer.classList.add("active");
                signinFrame.classList.add("active");
            }
            else if(data.message == "Please select the booking date."){
                alert("請選擇行程日期！");
            }
            else if(data.message == "Please select the booking date from tomorrow or later."){
                alert("請選擇明天或以後的行程日期！");
            };

            if(data.ok == true){
                location.href = "/booking";
            };
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
    });
    
};