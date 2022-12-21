import confirmBookingData from "./confirmBookingData.js";

export default function tapPayCreditCardSubmit(){

    const view = {
        render: function(){
            const tappayStatus = TPDirect.card.getTappayFieldsStatus();

            if(tappayStatus.canGetPrime === false){
                confirmBookingData("Cannot get prime");
                return;
            };
            
            TPDirect.card.getPrime((result) => {
                if(result.status !== 0){
                    confirmBookingData("Get prime error: " + result.msg);
                    return;
                };
                confirmBookingData(result.card.prime);
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