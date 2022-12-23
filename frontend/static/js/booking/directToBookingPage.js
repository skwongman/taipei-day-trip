export default function directToBookingPage(){

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
        }
    };
    controller.init();

};