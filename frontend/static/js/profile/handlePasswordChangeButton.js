import inputVerification from "./inputVerification.js";

export default function handlePasswordChangeButton(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            // Handle password change event.
            document.querySelector("#passwordChangeButtonRight").addEventListener("click", () => {
                const userInputNewPassword = passwordChangeInput.value;
                const patterns = inputVerification();
                loading.classList.add("show");
                
                if(!patterns["password"].test(userInputNewPassword)){
                    view.renderHandlePatterns();
                }
                else{
                    async function updateProfile(url, method){
                        const response = await fetch(url, method);
                        const data = await response.json();
                        return data;
                    };

                    updateProfile("/api/user/password", {
                        method: "PUT",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            "password": userInputNewPassword
                        })
                    })
                    .then(data => {
                        view.renderHandlePasswordChange(data);
                    })
                    .catch((error) => {
                        view.renderError(error);
                    });
                };
            });
        }
    };

    const view = {
        renderHandlePatterns: function(){
            loading.classList.remove("show");
            alert("抱歉！請輸入正確密碼格式。");
        },
        renderHandlePasswordChange: function(data){
            if(data.ok == true){
                loading.classList.remove("show");
                setTimeout(() => alert("新的密碼已更改成功！"), 500);
            };
        },
        renderError: function(error){
            loading.classList.remove("show");
            console.log("Error(18): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};