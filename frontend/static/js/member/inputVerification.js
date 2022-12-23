export default function inputVerification(){

    const view = {
        render: function(){
            const patterns = {
                name: /[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]/,
                email: /^([\w-]+)@([a-z\d-]+)\.([a-z]{2,8})([\.a-z]{2,8})?$/,
                password: /^[\w`~!@#$%^&*()=+-]{8,20}$/
            };

            document.querySelectorAll("input.register-input").forEach((input) => {
                input.addEventListener("keyup", (e) => {
                    validate(e.target, patterns[e.target.attributes.name.value]);
                });
            });

            function validate(field, regex){
                const registerMenu = document.querySelector("#register-menu");
                if(regex.test(field.value)){
                    field.className = "register-input valid";
                }
                else{
                    field.className = "register-input invalid";
                    registerMenu.style.height = "auto";
                };
            };

            return patterns;
        }
    };

    const controller = {
        init: function(){
            view.render();
        }
    };
    controller.init();

    return view.render();

};