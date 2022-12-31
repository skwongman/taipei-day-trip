export default function handlePictureChangeButton(){

    const form = document.getElementById("picture-upload-form");
    const loading = document.querySelector(".loading");
    
    const view = {
        // Return the instance picture preview effect right after selecting the correct picture.
        renderPicturePreview: function(){
            form.addEventListener("change", (e) => {
                const selectedPicture = e.target.files[0];
                // Selection of picture size larger than 1MB is not allowed.
                if(selectedPicture.size > 1000000) {
                    alert("請選擇容量少於1MB的個人圖片！");
                    e.target.value = null;
                }
                else{
                    const pictureToBeUploaded = form.elements["profileUploadPicture"].files[0];
                    const picturePreview = document.querySelector(".picture-change-picture");
                    const pictureURL = URL.createObjectURL(pictureToBeUploaded);
                    picturePreview.src = pictureURL;
                };
            });
        },
        // Handle picture upload button by fetching API.
        renderPictureUpload: function(){
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const picture = form.elements["profileUploadPicture"].files[0];
                const pictureData = new FormData();

                // If the picture is not selected but upload button is clicked, remind the user to select the picture accordingly.
                if(picture == undefined){
                    alert("請選擇要上載的個人圖片！");
                }
                else{
                    loading.classList.add("show");
                    pictureData.append("profileUploadPicture", picture);

                    async function getPictureData(url, method){
                        const response = await fetch(url, method);
                        const data = await response.json();
                        return data;
                    };
            
                    getPictureData("/api/user/picture", {
                        method: "PUT",
                        body: pictureData
                    })
                    .then(data => {
                        if(data.error == true && data.message == "Invalid file type."){
                            loading.classList.remove("show");
                            setTimeout(() => alert("請選擇正確的圖片格式！"), 500);
                            profileUploadPicture.value = "";
                        };

                        if(data.error == true && data.message == "The picture size is too large."){
                            loading.classList.remove("show");
                            setTimeout(() => alert("請選擇容量少於1MB的個人圖片！"), 500);
                            profileUploadPicture.value = "";
                        };

                        if(data.ok == true){
                            loading.classList.remove("show");
                            setTimeout(() => alert("個人圖片更改成功！"), 500);
                            profileUploadPicture.value = "";
                        };
                    })
                    .catch((error) => {
                        loading.classList.remove("show");
                        profileUploadPicture.value = "";
                        console.log("Error(19): " + error);
                    });
                };
            });
        }
    };

    const controller = {
        init: function(){
            view.renderPicturePreview();
            view.renderPictureUpload();
        }
    };
    controller.init();

};