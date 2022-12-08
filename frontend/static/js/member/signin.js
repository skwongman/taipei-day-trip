export default function signinSystem(memberInputVerification){

    const signinButton = document.querySelector("#signin-button");
    const signinMessage = document.querySelector("#signinMessage");
    const registerPatterns = memberInputVerification();

    signinButton.addEventListener("click", () => {

        if(!registerPatterns["email"].test(signinEmail.value) ||
        !registerPatterns["password"].test(signinPassword.value)){
            signinMessage.innerHTML = `
                <div class='signin-message warning'>請輸入正確登入帳戶資料！</div>
            `;
        };

        async function putUserData(url, method){
            const response = await fetch(url, method);
            const data = await response.json();
            return data;
        };

        putUserData("http://52.205.132.168:3000/api/user/auth", {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "email": signinEmail.value,
                "password": signinPassword.value
            })
        })
        .then(data => {
            if(data.ok){
                (location.href.split("/")[3] == "attraction") ?
                location.href = location.href :
                location.href = "/";
            };

            if(data.message == "The e-mail and/or password is/are not correct."){
                signinMessage.innerHTML = `
                    <div class='signin-message warning'>抱歉，電子信箱或密碼輸入錯誤。</div>
                `;
            };
        })
        .catch((error) => {
            console.log("Error: " + error);
        });

    });

};