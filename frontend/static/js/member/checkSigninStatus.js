export default  function checkSigninStatus(){

    const signin = document.querySelector("#signin");
    const signout = document.querySelector("#signout");

    async function getUserData(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    getUserData("/api/user/auth")
    .then(data => {
        if(data.data != null){
            signin.classList.add("inactive");
            signout.classList.remove("inactive");
            signout.classList.add("item");
        };
    })
    .catch((error) => {
        console.log("Error: " + error);
    });

};