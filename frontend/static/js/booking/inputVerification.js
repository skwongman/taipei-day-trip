export default function inputVerification(){

    const view = {
        render: function(){
            const patterns = {
                name: /[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]/,
                email: /^([\w-]+)@([a-z\d-]+)\.([a-z]{2,8})([\.a-z]{2,8})?$/,
                contact: /^[\d]{9}$/
            };

            document.querySelectorAll("input.contact-input").forEach((input) => {
                input.addEventListener("keyup", (e) => {
                    validate(e.target, patterns[e.target.attributes.name.value]);
                });
            });
        
            function validate(field, regex){
                if(regex.test(field.value)){
                    field.className = "contact-input valid";
                }
                else{
                    field.className = "contact-input invalid";
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