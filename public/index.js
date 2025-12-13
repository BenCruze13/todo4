let username = document.getElementById("username");
let password = document.getElementById("password");
let login = document.getElementById("login");
let form = document.getElementById("form");
let Name="";
let user_ID;

form.addEventListener("submit",function(event){
    event.preventDefault();
})

password.addEventListener("mouseover",function(){
    password.type = "text";
})
password.addEventListener("mouseout",function(){
    password.type = "password";
})

login.addEventListener("click", validate);

function validate(){
    let db = JSON.parse(localStorage.getItem("storedUsers"))||[];
    userRep = false;
    
    db.forEach(function(item){
        if(username.value==item.Username&&password.value==item.Password){
            userRep = true;
            Name = item.name;
            user_ID = item.user_ID;
        }
        else{
            
        }
    })
    if(userRep==false){
        alert("Invalid Username or Password");
    }
    else{
        
        const obj = {
            c_username: Name,
            c_user_ID: user_ID
        }
        sessionStorage.setItem("currentUser",JSON.stringify(obj));
        window.location.replace('list.html');
    }
}
