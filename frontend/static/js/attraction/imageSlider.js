// Image slider
export default function imageSlider(){

    var counter = 0;
    const navigationDots = document.querySelector(".navigation-dots");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    const images = document.querySelectorAll("img.attraction-image");

    function slideImages(){
        images.forEach((slide) => {
            slide.style.display = "none";
        });
        images[counter].style.display = "block";
        navDots();
    };
    slideImages();

    function navDots(){
        const currentDot = document.querySelector(".single-dot.active");
        currentDot.classList.remove("active");
        navigationDots.children[counter].classList.add("active");
    };

    function slideButton(){
        prevButton.addEventListener("click", () => {
            (counter == 0) ?
            (counter = images.length - 1) :
            counter --
            slideImages();
        });
    
        nextButton.addEventListener("click", () => {
            (counter == images.length - 1) ?
            counter = 0 :
            counter ++
            slideImages();
        });
    };
    slideButton();
    
};