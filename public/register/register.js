let Name = document.getElementById("name");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let signUp = document.getElementById("signUp");
let form = document.getElementById("form");
let lastUser_ID = localStorage.getItem("lastUser_ID")||0;


form.addEventListener("submit",function(event){
    event.preventDefault();
})

signUp.addEventListener("click",function(){
    if(confirmPassword.value==password.value&&(Name.value!="" && username.value!="" && email.value!="" && password.value!="" && confirmPassword.value!="")){
        if(!email.value.includes("@gmail")||!email.value.includes(".com")){
            alert("please enter a valid email")
        }else{
            if(checkData(username.value,email.value)==true){
                storeData();
                alert(`Succesfully Registered as ${username.value}`)
                console.log("pointer")
                }else{
                    alert("username has been taken or email in use");
                    console.log("try again")
                }
        }
    }
    else if(Name.value!="" || username.value!="" || email.value!="" || password.value!="" || confirmPassword.value!=""){
        alert("empty fields present");
    }
    else if(confirmPassword.value!=password.value&&(Name.value!="" && username.value!="" && email.value!="" && password.value!="" && confirmPassword.value!="")){
        alert("password doesnt match password confirmation");
    }
})


function storeData(){
    lastUser_ID=Number(lastUser_ID)+1
    let registeredUsers = JSON.parse(localStorage.getItem("storedUsers"))||[];
const obj={
    name: Name.value.trim(),
    Username: username.value,
    Email: email.value,
    Password: password.value,
    user_ID: lastUser_ID
}
registeredUsers.push(obj)
console.log(registeredUsers)
    localStorage.setItem("lastUser_ID",lastUser_ID);
    localStorage.setItem("storedUsers",JSON.stringify(registeredUsers));
   
}
function checkData(x,y){
    let db = JSON.parse(localStorage.getItem("storedUsers"))||[];
    let state = true;
    db.forEach(function(item){
        if(x==item.Username){

            state = false;
        }
        else if(y==item.Email){
            state = false;
        }
        else{
            state=true;
        }

    })
    return state;
}