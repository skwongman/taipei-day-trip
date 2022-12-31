export default function directToBookingPage(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            document.querySelector("#booking").addEventListener("click", () => {
                async function getUsernameData(url){
                    const response = await fetch(url);
                    const data = await response.json();
                    return data;
                };
                
                getUsernameData("/api/user/auth")
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
        renderLoadingEffect: function(){
            try{
                loading.classList.add("show");
                setTimeout(() => {
                    if(document.querySelector("#bookingOuterContainer")){
                        document.querySelector("#bookingOuterContainer").style.display = "block";
                        loading.classList.remove("show");
                    };
                }, 500);
            }
            catch(error){
                console.log("Error(21): " + error);
            };
        },
        render: function(data){
            if(data.data){
                location.href = "/booking";
            };
    
            if(data.data == null){
                document.querySelector("#layer").classList.add("active");
                document.querySelector("#signin-frame").classList.add("active");
            };
        },
        renderError: function(error){
            if(error.message == "data.data is null"){
                return null;
            };
            console.log("Error(4): " + error);
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