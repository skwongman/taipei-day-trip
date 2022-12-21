export default  function checkSigninStatus(){

    const model = {
        init: function(){        
            async function getUserData(url){
                const response = await fetch(url);
                const data = await response.json();
                return data;
            };
        
            getUserData("/api/user/auth")
            .then(data => {
                view.render(data);
            })
            .catch((error) => {
                view.renderError(error);
            });
        }
    };

    const view = {
        render(data){
            if(data.data != null){
                const signin = document.querySelector("#signin");
                const signout = document.querySelector("#signout");
                
                signin.classList.add("inactive");
                signout.classList.remove("inactive");
                signout.classList.add("item");
            };
        },
        renderError(error){
            console.log("Error(6): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};