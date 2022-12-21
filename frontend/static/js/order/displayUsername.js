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
            if(data != null){
                const username = document.querySelector("#username");
                username.textContent = `您好，${data.name}，您已預訂的行程如下：`;
            };
        },
        renderError: function(error){
            if(error.message == "data.data is null"){
                return null;
            };
            console.log("Error(10): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};