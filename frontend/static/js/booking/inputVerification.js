export default function inputVerification(){

    const patterns = {
        name: /[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]/,
        email: /^([\w-]+)@([a-z\d-]+)\.([a-z]{2,8})([\.a-z]{2,8})?$/,
        contact: /^[\d]{9}$/,
        cardNum: /^[\d+]{4}[ +]{1}[\d+]{4}[ +]{1}[\d+]{4}[ +]{1}[\d+]{4}$/,
        cardDate: /^[\d+]{2}[/+]{1}[\d]{2}$/,
        cardCVV: /^[\d]{3}$/
    };

    const contactInputs = document.querySelectorAll("input.contact-input");
    const creditCardInputs = document.querySelectorAll("input.credit-card-input");  
    
    function verifyInputs(verifyInput){
        verifyInput.forEach((input) => {
            input.addEventListener("keyup", (e) => {
                validate(e.target, patterns[e.target.attributes.name.value]);
            });
        });
    };
    verifyInputs(contactInputs);
    verifyInputs(creditCardInputs);

    function validate(field, regex){
        if(regex.test(field.value)){
            field.className = "contact-input valid";
            field.className = "credit-card-input valid";
        }
        else{
            field.className = "contact-input invalid";
            field.className = "credit-card-input invalid";
        };
    };

    return patterns;

};