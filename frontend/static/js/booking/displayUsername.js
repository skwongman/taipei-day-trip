export default function displayUsername(){

    const model = {
        init: function(){
            async function getUsernameData(url){
                const response = await fetch(url);
                const data = await response.json();
                return data.data;
            };
            
            getUsernameData("/api/user/auth")
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
            const username = document.querySelector("#username");
            const bookingNoBooking = document.querySelector("#bookingNoBooking");
            const contactName = document.querySelector("#contactName");
            const contactEmail = document.querySelector("#contactEmail");

            if(data){
                username.textContent = `您好，${data.name}，待預訂的行程如下：`;
                bookingNoBooking.textContent = "目前沒有任何待預訂的行程。";
                contactName.attributes.value.value = data.name;
                contactEmail.attributes.value.value = data.email;
            };
        },
        renderError: function(error){
            if(error.message == "data.data is null"){
                return null;
            };
            console.log("Error(5): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};