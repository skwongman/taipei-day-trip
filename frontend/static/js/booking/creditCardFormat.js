export default function creditCardFormat(idName, indexFormat, length, maxLength){

    const creditCard = document.getElementById(idName);

    creditCard.addEventListener("keyup", () => {
        const index = creditCard.value.lastIndexOf(indexFormat);
        const numFormat = creditCard.value.substr(index + 1);

        if (numFormat.length === length && creditCard.value.length < maxLength){
            creditCard.value = creditCard.value + indexFormat;
        };
    });
    
};