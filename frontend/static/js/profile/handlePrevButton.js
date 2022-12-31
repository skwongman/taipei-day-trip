export default function handlePrevButton(){

    const view = {
        render: function(){
            // Picture to profile page.
            document.querySelector("#pictureChangeButtonLeft").addEventListener("click", () => {
                location.href = "/profile";
            });

            // E-mail to profile page.
            document.querySelector("#emailChangeButtonLeft").addEventListener("click", () => {
                if(emailChangeInput.value == ""){
                    document.querySelector("#emailChangeContainer").style.display = "none";
                    document.querySelector("#profileContainer").style.display = "block";
                }
                else{
                    location.href = "/profile";
                };
            });

            // Name to profile page.
            document.querySelector("#nameChangeButtonLeft").addEventListener("click", () => {
                if(nameChangeInput.value == ""){
                    document.querySelector("#nameChangeContainer").style.display = "none";
                    document.querySelector("#profileContainer").style.display = "block";
                }
                else{
                    location.href = "/profile";
                };
            });

            // Password to profile page.
            document.querySelector("#passwordChangeButtonLeft").addEventListener("click", () => {
                if(passwordChangeInput.value == ""){
                    document.querySelector("#passwordChangeContainer").style.display = "none";
                    document.querySelector("#profileContainer").style.display = "block";
                }
                else{
                    location.href = "/profile";
                };
            });
        }
    };

    const controller = {
        init: function(){
            view.render();
        }
    };
    controller.init();

};