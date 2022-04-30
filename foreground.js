//make a list of videos/accepted file types on the webpage
var imagesList = document.querySelectorAll("img");
var imagesSrc = []

//remove duplicate images
for (var i = 0; i < imagesList.length; i++){
        if(!imagesSrc.includes(imagesList[i].src) && imagesList[i].width != 1){
                imagesSrc[i] = imagesList[i].src;
        }  
}


console.log(imagesList);
console.log(imagesSrc);

//sending list to popup_script every second so it is always there
setTimeout(function(){
        chrome.runtime.sendMessage({
                message: "saveList",
                payload: imagesSrc
        }, response => {
                if (response.message === "success"){
                        console.log("success");
                }
                else{
                        console.log("fail")
                }
        });
        console.log("data sent");
}, 1000)

