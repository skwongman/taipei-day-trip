export default function signoutSystem(){
    
    const model = {
        init: function(){
            document.querySelector("#signout").addEventListener("click", () => {
                async function deleteUserData(url, method){
                    const response = await fetch(url, method);
                    const data = await response.json();
                    return data;
                };
            
                deleteUserData("/api/user/auth", {
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
            if(data.ok){
                const urlParameter = location.href.split("/")[3];
                
                if(urlParameter == "attraction" || urlParameter == "booking"){
                    location.href = location.href
                }
                else{
                    location.href = "/";
                };
            };
        },
        renderError: function(){
            console.log("Error(8): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};