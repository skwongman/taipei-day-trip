export default function verifyInputAttractionID(){

    const view = {
        render: function(){
            const pattern = {inputAttractionID: /[\d]/};
            const attractionID = location.href.split("/").pop();
        
            if(!pattern["inputAttractionID"].test(attractionID)){
                location.href = "/";
            };
        }
    };

    const controller = {
        init: function(){
            view.render();
        }
    };
    controller.init();

};