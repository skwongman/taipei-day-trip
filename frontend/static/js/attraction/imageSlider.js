export default function imageSlider(){

    const view = {
        render: function(){
            var counter = 0;
            const prevButton = document.querySelector("#prev");
            const nextButton = document.querySelector("#next");
            const images = document.querySelectorAll("img.attraction-image");

            // Slide buttons
            prevButton.addEventListener("click", () => {
                (counter == 0) ? (counter = images.length - 1) : counter --
                slideImages();
            });
        
            nextButton.addEventListener("click", () => {
                (counter == images.length - 1) ? counter = 0 : counter ++
                slideImages();
            });

            function slideImages(){
                const navigationDots = document.querySelector(".navigation-dots");
                const currentDot = document.querySelector(".single-dot.active");

                images.forEach((slide) => {
                    slide.style.display = "none";
                });
                images[counter].style.display = "block";

                // Navigation dots.
                currentDot.classList.remove("active");
                navigationDots.children[counter].classList.add("active");
            };
            slideImages();
        }
    };

    const controller = {
        init: function(){
            view.render();
        }
    };
    controller.init();

};