export default function handleToIndividualPageButton(){

    const view = {
        render: function(){
            // To picture page.
            document.querySelector("#profileButtonPicture").addEventListener("click", () => {
                document.querySelector("#profileContainer").style.display = "none";
                document.querySelector("#pictureChangeContainer").style.display = "block";
            });

            // To e-mail page.
            document.querySelector("#profileButtonEmail").addEventListener("click", () => {
                document.querySelector("#profileContainer").style.display = "none";
                document.querySelector("#emailChangeContainer").style.display = "block";
            });

            // To name page.
            document.querySelector("#profileButtonName").addEventListener("click", () => {
                document.querySelector("#profileContainer").style.display = "none";
                document.querySelector("#nameChangeContainer").style.display = "block";
            });

            // To password page.
            document.querySelector("#profileButtonPassword").addEventListener("click", () => {
                document.querySelector("#profileContainer").style.display = "none";
                document.querySelector("#passwordChangeContainer").style.display = "block";
            });

            // To order details page.
            document.querySelector("#profileButtonOrderDetails").addEventListener("click", () => {
                location.href = "/order"
            })
        }
    };

    const controller = {
        init: function(){
            view.render();
        }
    };
    controller.init();

};