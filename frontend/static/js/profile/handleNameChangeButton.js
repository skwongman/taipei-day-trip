import inputVerification from "./inputVerification.js";

export default function handleNameChangeButton(){

    const loading = document.querySelector(".loading");

    const model = {
        init: function(){
            // Handle name change event.
            document.querySelector("#nameChangeButtonRight").addEventListener("click", () => {
                const userInputNewName = nameChangeInput.value;
                const userCurrentName = document.querySelector("#profileName").textContent;
                const patterns = inputVerification();
                loading.classList.add("show");
                
                if(!patterns["name"].test(userInputNewName)){
                    view.renderHandlePatterns();
                }
                else if(userInputNewName == userCurrentName){
                    view.renderHandleNewName();
                }
                else{
                    async function updateProfile(url, method){
                        const response = await fetch(url, method);
                        const data = await response.json();
                        return data;
                    };

                    updateProfile("/api/user/name", {
                        method: "PUT",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            "name": userInputNewName
                        })
                    })
                    .then(data => {
                        view.renderHandleNameChange(data);
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
            alert("抱歉！請輸入正確名字。");
        },
        renderHandleNewName: function(){
            loading.classList.remove("show");
            alert("新的名字必須與目前使用的不同！");
        },
        renderHandleNameChange: function(data){
            if(data.ok == true){
                setTimeout(() => {
                    loading.classList.remove("show");
                    alert("新的名字已更改成功！");
                }, 500);
            };
        },
        renderError: function(error){
            loading.classList.remove("show");
            console.log("Error(17): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};