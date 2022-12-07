export default function signoutSystem(){

    const signout = document.querySelector("#signout");
    
    signout.addEventListener("click", () => {
        
        async function deleteUserData(url, method){
            const response = await fetch(url, method);
            const data = await response.json();
            return data;
        };
    
        deleteUserData("http://52.205.132.168:3000/api/user/auth", {
            method: "DELETE"
        })
        .then(data => {
            if(data.ok){
                (location.href.split("/")[3] == "attraction") ?
                location.href = location.href :
                location.href = "/";
            };
        })
        .catch((error) => {
            console.log("Error: " + error);
        });

    });

};