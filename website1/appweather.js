//create a new date 
let date1 = new Date();
// here we add +1 so the index  of the month could start from 1 not from 0
let newDate1 = date1.getMonth() + 1 + '.' + date1.getDate()+'.'+ date1.getFullYear();
// we will get the id "temp" and store it in the variable called "Temperature" by using document.getElementById method
let Temperature = document.getElementById('temp');
// i will put the url of the weather from openweathermap.org in the variable "Baseurl" and i put https:// at the bigining of the url
let Baseurl ="https://api.openweathermap.org/data/2.5/weather?zip=";
//i will put my API key that i get after signing up IN THE VARAIBLE called "Myapikey" and i make the unit of the temperature to be metric
const Myapikey  = ",us&units=metric&appid=c66cae3b66fa453df507175fb7c70641";

// here we will access to the "Generate" button and add an eventlistener to it and the event is click and a callback function called "PerformSomeactions"
document.getElementById('generate').addEventListener('click',PerformSomeactions);
// the function is when the user enter zip code and his feeling then we click on the generate button 
function PerformSomeactions(e){
 // we will get the value of zip code that the user will enter it and store it in the variable called "zipCode"by using document.getElementById method 
  const zipCode =  document.getElementById('zip').value;
// we will get the value of user's feeling and store it in the variable "myFeelings" by using document.getElementById method
  const myFeelings =  document.getElementById('feelings').value;
 // here we put a condition that when the user doesn't enter the zip code the we will show alert or message to tell him to enter it   
  if(zipCode ===""){
    alert("enter zip code")
  }else{// if the user enter the zip code and his feeling then we will excute the next lines of the code
     // her if the user enter the zip code then we will call the getOurData function that take 3 parameter Baseurl ,zipcode that the user will enter it and  Myapikey
    getOurData(Baseurl,zipCode,Myapikey)   
      // we make a chain by using .then to chain the promises that the data that we get(after posting it) and the updateUI(THE data that the user will enter in the feelings)i.e we make a post request 
    .then(function(data){
        //we will console the data
        console.log(data)
//here we will call our function called "postData" (the function that we use it to create a post request on the client side) and pass to it the path (or the url)of the post route "/add" and make an object that contain the information that will be posted which are the date
// and the temperature that we will get it from the object "data" from the API AND THE feeling of the user and we will do these by using dot notation and then post that object
//we make a chaining promise by making a GET request to the weather API and making POST request to store all the data we received locally in our app  
        postOurData('/add',{date:newDate1,temp:data.main.temp,content:myFeelings});
    })//we will call the function updateUI after getting all data from other functions by using .then 
//    .then(() => updateUI()) We call a function and inside this function we call the updateUI
// we use .then() to chain actions
   .then(() =>updateUIData())
   }   
}
//here we make the "getOurData" function an async function to wait until we get Baseurl,zipCode and Myapikey and then excute the next lines in the code
// i.e. we use it to mke a GET request to get Baseurl,zipCode and Myapikey from the API
// getOurData is an  asynchronous function
const getOurData = async (Baseurl,zipCode,Myapikey) =>{ 
    // here we use the keyword "await" to wait until we get the API RESPONSE of Baseurl,zipCode,Myapikey by calling fetch() and put it in the variable called "request"
    const request = await fetch(Baseurl+zipCode+Myapikey);
//we will use try keyword if all things is good and there is no wrong then once we get API response try will convert the data that we get from API REQUEST to the JSON DATA  
    try {
    //we will wait untill we convert the data that we get from API response to json data by using await keyword and then store it in the variable called "response" 
        const response = await request.json();
         // WE CONSOLE the response
        console.log(response);
         // we will return the response
        return response ;
     // if there a something is wrong then we print or console error by using catch keyword
    } catch (error) {
        console.log("error", error)  
    }  
}
// we will make a post request to  the server get the data from the object in which "postOurData" an async function
// we make url and data objest are empty so that when there is an error then we get an empty object not undefined 
//// postOurData is an  asynchronous function
const postOurData = async ( url = '', data = {})=>{
//here we wait untill we get the url by using await keyword and we call  fetch() and pass to it the url we want to make a POST request to it and store it in the variable called "response11"
        const response11 = await fetch(url , {
          // we will use  a method to the post to access to the post route that we have made in the server.js file
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //we need credentials and headers to make a successful POST request
        //we need in the API of the weather to sign up and create credentials  
        credentials: 'same-origin', 
        headers: {//here we set a content type to the json to treate with json data 
            'Content-Type': 'application/json',
        },//we convert the javascript data object into string by using JSON.stringify()method 
        body: JSON.stringify(data), // body data type must match "Content-Type" header they must be the same data in the json
    
      });
    // here we use try keyword that if everthing is well then we wait till we convert the response1 to the json and put them in the variable called "OurnewData" and we use the keyword await
        try{
            const OurnewData = await response11.json();
            // we console OurnewData variable
            console.log(OurnewData);
// we will return OurnewData
            return OurnewData; 
        }catch(error) {// if there a something is wrong then we print or console error and we will use catch keyword
        console.log("error", error);
        // we treate with the error wiyhe appropriate way
        }
}

// making the function to get the data from the object which is in the server and the data from the user and put them inside an async function called"updateUIData"
// updateUIData is an  asynchronous function
const updateUIData = async() =>{// we will make a get request to the server file and to the information that the user enter it and the function is async because we wait untill we get the information from the server file and from the user
  // WE WILL USING A fetch() function and await keyword  to wait untill we get the url("/url") of the of the get request in the server file and store it in the variable called "request1" 
    const request1 =await fetch ('/url');
    try{//we will use try keyword so that if everything goes will and there is no error then we will excute the next lines of the code
         //we will wait untill we convert request1 to the json data and store it in the variable called "OurallData" and we use the keyword await 
       const OurallData = await request1.json();
 
   //we make a selectors to the elements that we want to update it and its names are date,temp,content and then we will identify data that we to update these elements with by using .innerHTML property    
 //we  get selector date  by using document.getElementById method and updata it with OurallData.date by using .innerHTML property
       document.getElementById('date').innerHTML = `Today is: ${OurallData.date}`;
    //we  get selector temp  by using document.getElementById method and updata it with OurallData.date by using .innerHTML property
       document.getElementById('temp').innerHTML = `The temperature is: ${OurallData.temp}`;   
 //we  get selector content  by using document.getElementById method and updata it with OurallData.date by using .innerHTML property
       document.getElementById('content').innerHTML = `your feeling is: ${OurallData.content}`;  
    }catch(error){// if there a something is wrong then we print or console error by using the keyword catch
      console.log("error",error);
    }
       
}