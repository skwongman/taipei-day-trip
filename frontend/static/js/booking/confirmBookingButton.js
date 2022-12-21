import inputVerification from "./inputVerification.js";
import bookingData from "./bookingData.js";
import tapPayCreditCardSubmit from "./tapPayCreditCardSubmit.js";

export default function confirmBookingButton(){

    const view = {
        render: async function(){
            const confirmButton = document.querySelector("#confirmButton");
            const patterns = inputVerification();
            const data = await bookingData();
            if(!data.data) return null;
            const orderData = data.data;
            const todayDate = new Date().toISOString().split('T')[0].replace("-", "").replace("-", "");
            const bookingDate = orderData.date.replace("-", "").replace("-", "");
        
            confirmButton.addEventListener("click", () => {
                // Not allow user to submit order with past booking date saved in the database.
                if(parseInt(bookingDate) <= parseInt(todayDate)){
                    alert("請重新加入新的行程！");
                }
                // Allow user to submit order only if all contact information are filled in correctly.
                else if(patterns["name"].test(contactName.value) &&
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