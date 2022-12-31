import addAttractionDatatoDOM from "./addAttractionDataToDOM.js";

export default function getAttractionData(){

    const model = {
        init: function(){
            const attractionID = location.href.split("/").pop();

            async function getData(url){
                const response = await fetch(url);
                const data = await response.json();
                return data;
            };
        
            getData("/api/attraction/" + attractionID)
            .then(data => {
                view.render(data);
            })
            .catch((error) => {
                view.renderError(error);
            });
        }
    };

    const view = {
        render: function(data){
            if(data.message == "Attraction ID Not Found."){
                location.href = "/";
            };

            if(data){
                addAttractionDatatoDOM(data.data);
            };
        },
        renderError: function(error){
            console.log("Error(12): " + error);
        }
    };

    const controller = {
        init: function(){
            model.init();
        }
    };
    controller.init();

};