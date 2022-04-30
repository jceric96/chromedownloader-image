//ask for the images array and save it on load
var imagesList = [];
chrome.runtime.sendMessage({
        message: "getList"
}, response => {
        if (response.message === "success"){
                imagesList = response.payload;
                console.log("success");

                //once we have the images list all images to div using document fragment
                var container = document.getElementById("images_div");

                var docFrag = document.createDocumentFragment();

                imagesList.forEach(function(url, index, originalArray){
                        var image = document.createElement("img");
                        //add each image to docFrag if there is a source
                        //forground doesnt send duplicate sources
                        if(url != null && url != ""){
                                image.src = url;
                                image.id = "downloadable";
                                docFrag.appendChild(image);
                        }
                        
                });
                
                container.appendChild(docFrag);

                //print to make sure it works
                console.log(container);
        }
        else{
                console.log("fail")
        }
});

//select all images and add an event listener to download them when clicked every 500ms
setTimeout(function(){
        document.querySelectorAll('img').forEach(item => {
                console.log('waiting for click')
                item.addEventListener('click', event => {
                        console.log("downloading")
                        var source = item.src
                        var fileName = source.substring(source.lastIndexOf('/')+1);
                        saveAs(source, fileName)
                })
        })
}, 500)

