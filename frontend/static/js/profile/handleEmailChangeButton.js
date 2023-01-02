import inputVerification from "./inputVerification.js";

export default function handleEmailChangeButton(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            // Handle e-mail change event.
            document.querySelector("#emailChangeButtonRight").addEventListener("click", () => {
                const userInputNewEmail = emailChangeInput.value;
                const userCurrentEmail = document.querySelector("#profileEmail").textContent;
                const patterns = inputVerification();
                loading.classList.add("show");
                
                if(!patterns["email"].test(userInputNewEmail)){
                    view.renderHandlePatterns();
                }
                else if(userInputNewEmail == userCurrentEmail){
                    view.renderHandleNewEmail();
                }
                else{
                    async function updateProfile(url, method){
                        const response = await fetch(url, method);
                        const data = await response.json();
                        return data;
                    };

                    updateProfile("/api/user/email", {
                        method: "PUT",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            "email": userInputNewEmail
                        })
                    })
                    .then(data => {
                        view.renderHandleEmailChange(data);
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
            alert("抱歉！請輸入正確電子信箱格式。");
        },
        renderHandleNewEmail: function(){
            loading.classList.remove("show");
            alert("新的電子信箱必須與目前使用的地址不同！");
        },
        renderHandleEmailChange: function(data){
            if(data.error == true && data.message == "This e-mail has been registered."){
                setTimeout(() => {
                    loading.classList.remove("show");
                    alert("抱歉，此電子信箱已被註冊！")
                }, 500);
            };

            if(data.ok == true){
                setTimeout(() => {
                    loading.classList.remove("show");
                    alert("新的電子信箱已更改成功！")
                }, 500);
            };
        },
        renderError: function(error){
            loading.classList.remove("show");
            console.log("Error(16): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};