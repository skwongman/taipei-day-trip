export default async function tapPayCreditCardInput(){

    const view = {
        render: function(){
            const app_id = xxx;
            const app_key = "xxx";
            const app_test_environment = "sandbox";

            TPDirect.setupSDK(app_id, app_key, app_test_environment);
            
            TPDirect.card.setup({
                fields: {
                    number: {
                        element: "#creditCardNum",
                        placeholder: "**** **** **** ****",
                    },
                    expirationDate: {
                        element: "#creditCardDate",
                        placeholder: "MM / YY"
                    },
                    ccv: {
                        element: "#creditCardCVV",
                        placeholder: "CVV"
                    }
                },
                styles: {
                    "input": {
                        "color": "gray",
                        "font-size": "16px"
                    },
                    "input.ccv": {
                    },
                    ":focus": {
                        "color": "black"
                    },
                    ".valid": {
                        "color": "green"
                    },
                    ".invalid": {
                        "color": "red"
                    }
                }
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