
//waits for DOM to finish loading 
document.addEventListener('DOMContentLoaded', () => {

    //gets all the data in the chrome data
    chrome.storage.local.get('List', function(data) {
        //check if data still even exists
        if(data == null){
            return false;
        }
        if(data.List == null){
            return false;
        }
        
        //get existing data and input to the list
        let li = '';
        let counter = data.List.length;
        let myJSON = '';

        //change the h2 tag with the updated list items
        document.querySelector('h2').innerHTML = `Items: ${counter}`;
        
        
        for(let i = 0; i < counter; i++){
            myJSON = data.List[i];
            li = document.createElement('li');
            li.innerHTML = myJSON;
            document.querySelector('#list').append(li);
        }

    });

    //calls function once #insert has submit a form/hit the input 
    //ADD function
    document.querySelector('#insert').onsubmit = () => {

        //if limit already max out 
        if(document.querySelectorAll('li').length >= 10){
            return false;
        };


        //get the value of the input
        let name = document.querySelector('#itemInput').value;

        //if user inputs nothing exit
        if(name == ''){
            return false;
        }
        
    

        //create element of 'li'
        const li = document.createElement('li');
        //add the contents to the value of 'name'
        li.innerHTML = name;

        //now append the element to the #list section
        document.querySelector('#list').append(li);

        //gets the length of all the list items (li) and stored it in counter
        counter = document.querySelectorAll('li').length;
        //change the h2 tag with the updated list items
        document.querySelector('h2').innerHTML = `Items: ${counter}`;

        //deleting textbox after input/delete
        document.querySelector('#itemInput').value = '';

        
        //storaging the li to the chrome API
        //clear existing storage 
        chrome.storage.local.clear(() =>{});
        //array
        let list = new Array();
        let whole_list = document.querySelectorAll('li');
        let myJSON = '';
        //loop
        for(let i = 0; i < whole_list.length; i++){
            myJSON = JSON.stringify(whole_list[i].innerHTML);
            myJSON = JSON.parse(myJSON);
            list.push(myJSON);
        }
        chrome.storage.local.set({'List': list});
        chrome.storage.local.set({'Length': whole_list.length});

    
        //prevents form from submitting (good for debugging!!!)
        return false;
    };

    //gets element "delete" and performs action once it has been clicked
    //REMOVE ALL function
    document.getElementById("delete").onclick = () => {

        //getting the length of the item
        let counter = document.querySelectorAll('li').length;

        //holds the parent of li which is element "list"
        var parent = document.getElementById("list");
        var child = '';
        for(let i = 0; counter > i; counter--){
            child = parent.getElementsByTagName("li")[0];
            //delete first element of the list item
            parent.removeChild(child);
        }

        document.querySelector('h2').innerHTML = `Items: 0`; 

        //clear existing storage 
        chrome.storage.local.set({'Length': 0});
        chrome.storage.local.remove(["List","Length"],() =>{});

    };

    //calls function once user inputs the #search button
    //SEARCH function
    document.querySelector('#search').onclick = () => {
        //get the length of li
        let counter = document.querySelectorAll('li').length;
        //making variables
        let list = document.querySelectorAll('li');
        let amazonURL = '';
        let myJSON = '';

        //goes inside if there is atleast 1 list item
        if(counter > 0){
            for(let i = 0; i < counter; i++){
                //getting the base URL/reseting for next loop
                amazonURL = 'https://amazon.com/s?k=';
                //convert the object (list item element) to a string
                myJSON = JSON.stringify(list[i].innerHTML);
                myJSON = JSON.parse(myJSON);
                //add the amazon URL with the search item
                amazonURL += myJSON;
                //create a new tab in the chrome browser
                chrome.tabs.create({url: amazonURL},function(){});
            }
        }
    }
        
});
    




