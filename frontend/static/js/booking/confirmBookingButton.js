import inputVerification from "./inputVerification.js";
import tapPayCreditCardSubmit from "./tapPayCreditCardSubmit.js";

export default function confirmBookingButton(){

    const view = {
        render: async function(){
            const confirmButton = document.querySelector("#confirmButton");
            const patterns = inputVerification();
        
            confirmButton.addEventListener("click", () => {
                // Allow user to submit order only if all contact information are filled in correctly.
                if(patterns["name"].test(contactName.value) &&
                patterns["email"].test(contactEmail.value) &&
                patterns["contact"].test(contactNum.value)){
                    tapPayCreditCardSubmit();
                }
                // Not allow user to submit order if all contact information are not filled in well.
                else{
                    alert("請輸入正確聯絡資訊！");
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