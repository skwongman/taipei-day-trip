export default function signupSystem(memberInputVerification){

    const registerButton = document.querySelector("#register-button");
    const registerMessage = document.querySelector("#registerMessage");
    const registerPatterns = memberInputVerification();

    registerButton.addEventListener("click", () => {

        if(!registerPatterns["name"].test(registerName.value) ||
        !registerPatterns["email"].test(registerEmail.value) ||
        !registerPatterns["password"].test(registerPassword.value)){
            registerMessage.innerHTML = `
                <div class='register-message warning'>請輸入正確註冊帳戶資料！</div>
            `;
        };
            
        async function postUserData(url, method){
            const response = await fetch(url, method);
            const data = await response.json();
            return data;
        };

        postUserData("http://52.205.132.168:3000/api/user", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "name": registerName.value,
                "email": registerEmail.value,
                "password": registerPassword.value
            })
        })
        .then(data => {
            if(data.ok){
                registerMessage.innerHTML = `
                    <div class='register-message successful'>註冊成功！</div>
                `;
            };
            if(data.message == "This e-mail has been registered."){
                registerMessage.innerHTML = `
                    <div class='register-message warning'>抱歉，此電子信箱已被註冊。</div>
                `;
            };
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
            
    });

};