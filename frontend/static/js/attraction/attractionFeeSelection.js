// Attraction Fee Selection Buttons.
export default function attractionFeeSelection(){

    const attractionAM = document.querySelector("#attractionAM");
    const attractionPM = document.querySelector("#attractionPM");
    const attractionFee = document.querySelector(".attraction-fee");

    attractionAM.addEventListener("click", () => {
        attractionFee.textContent = "2000";
        attractionFee.attributes.attractionTime.value = "morning";
    });

    attractionPM.addEventListener("click", () => {  
        attractionFee.textContent = "2500";
        attractionFee.attributes.attractionTime.value = "afternoon";
    });
    
};