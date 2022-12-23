export default function registerSigninMenu(){

    const view = {
        render(){
            const signin = document.querySelector("#signin");
            const layer = document.querySelector("#layer");
        
            const signinFrame = document.querySelector("#signin-frame");
            const signinRegisterClick = document.querySelector("#signin-register-click");
            const signinClose = document.querySelector("#signin-close");
        
            const registerFrame = document.querySelector("#register-frame");
            const registerMenu = document.querySelector("#register-menu");
            const registerSigninClick = document.querySelector("#register-signin-click");
            const registerClose = document.querySelector("#register-close");
        
            signin.addEventListener("click", () => {
                layer.classList.add("active");
                signinFrame.classList.add("active");
            });
        
            signinRegisterClick.addEventListener("click", () => {
                signinFrame.classList.remove("active");
                registerFrame.classList.add("active");
                registerMenu.style.height = "332px";
                registerMenu.style.height = "auto";
            });
        
            signinClose.addEventListener("click", () => {
                layer.classList.remove("active");
                signinFrame.classList.remove("active");
            });
        
            registerSigninClick.addEventListener("click", () => {
                registerFrame.classList.remove("active");
                signinFrame.classList.add("active");
            });
        
            registerClose.addEventListener("click", () => {
                layer.classList.remove("active");
                registerFrame.classList.remove("active");
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