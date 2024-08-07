//HERE we will be performing http request that is POST 
//first thing that is set here is base url for our backend , so right here

export const baseUrl = "http://localhost:5000/api"           //The export keyword in JavaScript is used to make functions, objects, or values available to other modules or files. It allows you to organize and modularize your code by defining what should be shared between different parts of your application.

//so this is the base url for our backend apis, and it's good to set it here at one point so that whenever we want to
//change it , we can easily do so
export const postRequest = async(url, body) => {
    console.log("body", body);
    const response = await fetch(url, {
        method : "POST" ,
        //this represents that we are working with the json data
        headers: {
            "Content-Type" : "application/json"
        },

        //this is the body of our request and it is a json object
        body
    });
    //from response we can extract our data , response is an object so we will store data by using .json()
    const data = await response.json()

     
    //before returning the data we can check if there is an error by using the OK property, if OK is true that means that we dont have any
    //error 
    if(!response.ok){
        // This variable will be used to store the error message retrieved from the data object.
        let message;

        if(data?.message){       //The ?. is the Optional Chaining operator, which ensures that if data is null or undefined, 
                                 //the code doesn't throw an error when trying to access its message property.
            message = data.message;
        }
        else{
            //usercontroller mein jo bhi error mesaages hain registration login mein jaise invalid password etc , woh sab data hia jo yahan
            //message mein store ho rhe hain, response will make use of the data that we set in userController
            message = data;
        }
        //we are returning the ibject 
        return {error: true, message };
    }
    //if there is no error we will not go inside if part and the data is returned
    return data;
}
