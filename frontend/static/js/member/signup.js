import inputVerification from "./inputVerification.js";

export default function signupSystem(){

    const model = {
        init: function(){
            const registerButton = document.querySelector("#register-button");
            const patterns = inputVerification();
        
            registerButton.addEventListener("click", () => {
        
                if(!patterns["name"].test(registerName.value) ||
                !patterns["email"].test(registerEmail.value) ||
                !patterns["password"].test(registerPassword.value)){
                    view.renderIncorrectInput();
                }
                else{
                    async function postUserData(url, method){
                        const response = await fetch(url, method);
                        const data = await response.json();
                        return data;
                    };
            
                    postUserData("/api/user", {
                        method: "POST",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            "name": registerName.value,
                            "email": registerEmail.value,
                            "password": registerPassword.value
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
                document.querySelector("#registerMessage").innerHTML = `
                    <div class='register-message successful'>註冊成功！</div>
                `
            };

            if(data.message == "This e-mail has been registered."){
                document.querySelector("#registerMessage").innerHTML = `
                    <div class='register-message warning'>抱歉，此電子信箱已被註冊。</div>
                `
            };
        },
        renderIncorrectInput: function(){
            document.querySelector("#registerMessage").innerHTML = `
                <div class='register-message warning'>請輸入正確註冊帳戶資料！</div>
            `
        },
        renderError: function(error){
            console.log("Error(9): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};