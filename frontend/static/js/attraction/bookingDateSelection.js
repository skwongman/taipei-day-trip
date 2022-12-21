export default function bookingDateSelection(){

    const view = {
        render: function(){
            var today = new Date();
            today.setDate(today.getDate() + 1);
            document.getElementsByName("attractionDate")[0].setAttribute('min', today.toISOString().split('T')[0]);
        }
    };

    const controller = {
        init: function(){
            view.render();
        }
    };
    controller.init();

};