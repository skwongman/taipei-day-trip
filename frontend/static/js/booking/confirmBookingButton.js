export default function confirmBookingButton(inputVerification){

    const confirmButton = document.querySelector("#confirmButton");
    const patterns = inputVerification()

    confirmButton.addEventListener("click", () => {
        if(patterns["name"].test(contactName.value) &&
        patterns["email"].test(contactEmail.value) &&
        patterns["contact"].test(contactNum.value) &&
        patterns["cardNum"].test(creditCardNum.value) &&
        patterns["cardDate"].test(creditCardDate.value) &&
        patterns["cardCVV"].test(creditCardCVV.value)){
            alert(true);
        }
        else{
            alert(false);
        };
    });
    
};