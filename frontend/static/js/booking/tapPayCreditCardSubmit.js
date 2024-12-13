import confirmBookingData from "./confirmBookingData.js";

export default function tapPayCreditCardSubmit(attractionData){

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
                confirmBookingData(result.card.prime, attractionData);
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