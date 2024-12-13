export default async function tapPayCreditCardInput(){

    const view = {
        render: function(){
            const app_id = 126805;
            const app_key = "app_l3qmyXlz8vXQ2fEJmiSNt5vRa6iTfAufkunvAwMQ9CaJ4zQLQE0fwFdFWab2";
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