chrome.runtime.onInstalled.addListener(() =>{
	chrome.storage.local.set({
					
	});
});

//on a new page load inject foreground
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status == "complete" && /^http/.test(tab.url)){
		chrome.scripting.executeScript({
			target: {tabId: tabId},
			files: ["foreground.js"]
		}) 
			.then (() => {
				console.log("INJECTED FOREGROUND SCRIPT")
			})
			.catch(err => console.log(err));
		}
})

//home for messages that manage the imagesList
var imagesList = [];
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message === "getList") {
		if (chrome.runtime.lastError){
			sendResponse({
				message: "fail"
			});

			return;

		}
		console.log(imagesList);
		sendResponse({
			
			message: "success",
			payload: imagesList
		});
		return true;
	}
	else if (request.message ===  "saveList"){

		imagesList = request.payload;

		if (chrome.runtime.lastError){
			sendResponse({
				message: "fail"
			});
		}

		sendResponse({
			message: "success",
		});
		return true;
	}
	
});