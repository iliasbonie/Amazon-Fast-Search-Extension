
//removing all so no duplicate id
chrome.contextMenus.removeAll(() => {
    //creating a new context menus
    chrome.contextMenus.create({
        "id": "amazonQuick",
        "title": "AmazonSearch",
        "contexts": ["selection"]
    });
    
    //when user clicks on the context menus
    chrome.contextMenus.onClicked.addListener(function(clickData){
        //if the user on the context menus actually click on the right one
        //and if the user have actual selection text
        if(clickData.menuItemId == "amazonQuick" && clickData.selectionText){
            let amazonURL = 'https://amazon.com/s?k=';
            amazonURL += clickData.selectionText;
            //create a new tab in the chrome browser
            chrome.tabs.create({url: amazonURL},function(){});

        }
    });
    
});
//calls if there is any changes in the chrome storage
chrome.storage.onChanged.addListener(function(changes, storageName){
    //check if it exist/not null
    if(changes.Length == null){
        return false;
    }
    if(changes.Length.newValue == null){
        return false;
    }
    if(changes.Length.newValue.toString() == null){
        return false;
    }
    //sets the badge text and set the value to the # of list items
    chrome.browserAction.setBadgeText({"text": changes.Length.newValue.toString()});
});








