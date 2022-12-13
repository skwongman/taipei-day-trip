export default function displayUsername(){

    const username = document.querySelector("#username");
    const bookingNoBooking = document.querySelector("#bookingNoBooking");
    const contactName = document.querySelector("#contactName");
    const contactEmail = document.querySelector("#contactEmail");

    async function getUsernameData(url){
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    };
    
    getUsernameData("/api/user/auth")
    .then(data => {
        if(data){
            username.textContent = `您好，${data.name}，待預訂的行程如下：`;
            bookingNoBooking.textContent = "目前沒有任何待預訂的行程。";
            contactName.attributes.value.value = data.name;
            contactEmail.attributes.value.value = data.email;
        };
    })
    .catch((error) => {
        if(error.message == "data.data is null"){
            return null;
        };
        console.log("Error: " + error);
    });
    
};