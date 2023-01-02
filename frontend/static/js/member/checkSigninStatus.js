export default  function checkSigninStatus(){

    const model = {
        init: function(){        
            async function getUserData(url){
                const response = await fetch(url);
                const data = await response.json();
                return data.data;
            };
        
            getUserData("/api/user/auth")
            .then(data => {
                view.render(data);
                view.renderUserProfile(data);
                view.renderDisplayUserName(data);
            })
            .catch((error) => {
                view.renderError(error);
            });
        }
    };

    const view = {
        render(data){
            if(data != null){
                const signin = document.querySelector("#signin");
                const signout = document.querySelector("#signout");
                
                signin.classList.add("inactive");
                signout.classList.remove("inactive");
                signout.classList.add("item");
            };
        },
        renderUserProfile: function(data){
            if(data != null){
                try{
                    const profilePicture = document.querySelector("#profilePicture");
                    const pictureChangePicture = document.querySelector("#pictureChangePicture");
                    const profileEmail = document.querySelector("#profileEmail");
                    const profileName = document.querySelector("#profileName");
                    const profilePassword = document.querySelector("#profilePassword");

                    profilePicture.innerHTML = `<img class="profile-picture-size" src="${data.picture}">`
                    pictureChangePicture.innerHTML = `<img class="picture-change-picture" src="${data.picture}">`
                    profileEmail.textContent = data.email;
                    profileName.textContent = data.name;
                    profilePassword.textContent = "********";
                }
                catch(err){
                    if(err.message == "profileName is null" || err.message == "profilePicture is null"){
                        return null;
                    };
                    console.log("Error(14): " + err);
                };
            };
        },
        renderDisplayUserName: function(data){
            if(data != null){
                const username = document.querySelector("#username");
                const bookingNoBooking = document.querySelector("#bookingNoBooking");
                const contactName = document.querySelector("#contactName");
                const contactEmail = document.querySelector("#contactEmail");
                const urlParamater = location.href.split("/").pop() == "booking";

                urlParamater ? username.textContent = `您好，${data.name}，待預訂的行程如下：` : username.textContent = `您好，${data.name}，您已預訂的行程如下：`;
                bookingNoBooking.textContent = "目前沒有任何待預訂的行程。";
                contactName.attributes.value.value = data.name;
                contactEmail.attributes.value.value = data.email;
            };
        },
        renderError: function(error){
            if(error.message == "username is null" || error.message == "bookingNoBooking is null"){
                return null;
            };
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