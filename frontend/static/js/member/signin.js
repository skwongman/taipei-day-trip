import inputVerification from "./inputVerification.js";

export default function signinSystem(){

    const model = {
        init: function(){
            const signinButton = document.querySelector("#signin-button");
            const patterns = inputVerification();
        
            signinButton.addEventListener("click", () => {

                if(!patterns["email"].test(signinEmail.value) ||
                !patterns["password"].test(signinPassword.value)){
                    view.renderIncorrectInput();
                }
                else{
                    async function putUserData(url, method){
                        const response = await fetch(url, method);
                        const data = await response.json();
                        return data;
                    };
        
                    putUserData("/api/user/auth", {
                        method: "PUT",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            "email": signinEmail.value,
                            "password": signinPassword.value
                        })
                    })
                    .then(data => {
                        view.render(data);
                    })
                    .catch((error) => {
                        view.renderError(error);
                    });
                };
        
            });
        }
    };

    const view = {
        render: function(data){
            if(data.ok == true){
                const urlParameter = location.href.split("/")[3];

                if(urlParameter == "attraction" || urlParameter == "booking"){
                    location.href = location.href
                }
                else{
                    location.href = "/";
                };
            };

            if(data.message == "The e-mail and/or password is/are not correct."){
                document.querySelector("#signinMessage").innerHTML = `
                    <div class='signin-message warning'>抱歉，電子信箱或密碼輸入錯誤。</div>
                `;
            };
        },
        renderIncorrectInput: function(){
            document.querySelector("#signinMessage").innerHTML = `
                <div class='signin-message warning'>請輸入正確登入帳戶資料！</div>
            `;
        },
        renderError(error){
            console.log("Error(7): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};