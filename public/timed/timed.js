const addButton = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const btnProgress = document.getElementById("btnProgress");
const progressBar = document.getElementById("progress");
const progLabel = document.getElementById("progLabel");
let done=0;
let total=0;
let percent =0;
let ind1 = 0;


let user_ID = loadUser();
loadProgress();
loadTasks();
loadState();




if(progressBar.value==100){
    progressBar.classList.add("completed");
}
else{
   progressBar.classList.remove("completed");
}

function addTask(){
    let time = document.getElementById("timeAmt").value;
    const task = taskInput.value.trim();
    const measure = document.getElementById("timeMeasure").value;
    let meas;
    if(measure=="second"){
        meas = "s"
    }
    else if(measure=="minute"){
        meas = "m"
    }
    else if(measure=="hour"){
        meas = "h"
    }
    else if(measure=="day"){
        meas = "d"
    }
    else{
        meas = ""
    }


    if(task!=""){
        createTaskElement(task,time,meas);
        taskInput.value = ""; 
        saveTasks()
        done--;
        progress();
    }
    else{
        alert("Enter a task")
    }
}
taskInput.addEventListener('keydown',function(event){
    if(event.key==="Enter"){
        addButton.click();
        console.log(user_ID);
    }
})

addButton.addEventListener('click', addTask);
let state =[]; 

function createTaskElement(task,time,meas,ind){
    ind=ind1;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
                <input type="checkbox" " id="${ind}">
                <h3>${task}</h3>
                <h4 id="timer${ind}">${time}</h4>
                <h5 id="measure">${meas}</h5>
                <button id="${ind}">delete</button>
                
    `
   
        if(meas=="s"){
            const count = setInterval(()=>{
            let red = time--;
            let sec = red
            if(red<0){
                clearInterval(count);
            }else{
                sec = sec<10 ? "0"+sec : sec;
                console.log(sec);
                let h4 = document.getElementById(`timer${ind}`);
                h4.textContent = sec;
            }
            },1000)     
        }
        else if(meas=="m"){
            let red = Number(time)*60;
            const count1 = setInterval(()=>{
            console.log(red);
            let min = Math.floor(red/60);
            let sec = red % 60;
            if(red<0){
                clearInterval(count1);
            }else{
                sec = sec<10 ? "0"+sec : sec;
                console.log(`${min}:${sec}`);
                let h4 = document.getElementById(`timer${ind}`);
                h4.textContent = `${min}:${sec}`;
            }   
            red--;
            },1000)
        }
        else if(meas=="h"){
            let red = Number(time)*3600;
            const count2 = setInterval(()=>{
            console.log(red);
            let hrs = Math.floor(red/3600)
            let min = Math.floor((red%3600)/60);
            let sec = red % 60;
            if(red<0){
                clearInterval(count2);
            }else{
                sec = sec<10 ? "0"+sec : sec;
                min = min < 10 ? "0" + min : min;
                hrs = hrs < 10 ? "0" + hrs : hrs;
                console.log(`${hrs}:${min}:${sec}`);
                let h4 = document.getElementById(`timer${ind}`);
                h4.textContent = `${hrs}:${min}:${sec}`;
            }   
            red--;
            },1000)
        }
        else if(meas=="d"){
            let red = Number(time)*86400;
            const count3 = setInterval(()=>{
            console.log(red);
            let day = Math.floor(red/86400)
            let hrs = Math.floor((red%86400)/3600);
            let min = Math.floor((red%3600)/60);
            let sec = red % 60;
        
            if(red<0){
                clearInterval(count3);
            }else{
                sec = sec<10 ? "0"+sec : sec;
                min = min < 10 ? "0" + min : min;
                hrs = hrs < 10 ? "0" + hrs : hrs;
                console.log(`${day}:${hrs}:${min}:${sec}`);
                let h4 = document.getElementById(`timer${ind}`);
                h4.textContent = `${day}:${hrs}:${min}:${sec}`;
            }   
            red--;
            },1000)
        }
 
    taskList.appendChild(listItem);
    
    let check = listItem.querySelector("input");
    
    check.addEventListener('click',function(){
        if(check.checked==true){
            progress();
            saveState();
            if(progressBar.value==100){
                progressBar.classList.add("completed");
            }
            else{
               progressBar.classList.remove("completed");
            }
        }
        else{
            Neg_progress();
            saveState();
            if(progressBar.value==100){
                progressBar.classList.add("completed");
            }
            else{
               progressBar.classList.remove("completed");
            }
        }
        


    });
    ind1++;//increment index 
    
    let deleteButton = listItem.querySelector('button');

    deleteButton.addEventListener('click',function(){
        taskList.removeChild(listItem);
        state.splice(ind,1);
        console.log(state);
        saveTasks();
        progLabel.textContent = `${done} out of ${total} done`
        if(total==0){
            progressBar.value = 0;
            progLabel.textContent = "";
        }else{
        percent = (done/total)*100;
        console.log('p',percent);
        progressBar.value = percent;
        }
        if(done>0 && check.checked){
            Neg_progress();
            saveProgress();
            saveState();
        }
        else if(total==0){
            progLabel.textContent = "";

        }    
        saveProgress();   
        saveState(); 
    })
    saveProgress();
    
}
function saveState(){
    let state = [];
    taskList.querySelectorAll('li').forEach(function(item){
        state.push(item.querySelector("input").checked);
    });
    localStorage.setItem(`TimeboxState${user_ID}`,JSON.stringify(state))
}
function loadState(){
    const state = JSON.parse(localStorage.getItem(`TimeboxState${user_ID}`))||[];
    let a=0;
        taskList.querySelectorAll('li').forEach(function(item){
            item.querySelector("input").checked=state[a];
            a++;
    });
}

function saveTasks(){
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item){
        tasks.push({txt:item.querySelector("h3").textContent.trim(),
        time:item.querySelector("h4").textContent.trim(),
        measure:item.querySelector("h5").textContent.trim()
    });
        
    });
    localStorage.setItem(`Timetasks${user_ID}`, JSON.stringify(tasks));
    console.log(tasks.length);
    total=tasks.length;
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem(`Timetasks${user_ID}`))||[];
    tasks.forEach(function(itemz){
        createTaskElement(itemz.txt,itemz.time,itemz.measure);
    });
}

function progress(){
    done++;
    progLabel.textContent = `${done} out of ${total} done`
    percent = (done/total)*100;
    progressBar.value = `${percent}`;
    console.log("done =",done);
    saveProgress();
    saveState();
}
function Neg_progress(){
    done--;
    progLabel.textContent = `${done} out of ${total} done`
    if(total==0){
        progressBar.value = 0;
    }
    else{
    percent = (done/total)*100;
    progressBar.value = `${percent}`;
    }
    console.log("done =",done);
    saveProgress();
    saveState()
}

function saveProgress(){
    let progresses = [];
    progresses.push(done);
    progresses.push(total);
    localStorage.setItem(`Timeprogress${user_ID}`,JSON.stringify(progresses));

}
function loadProgress(){
    const progresses = JSON.parse(localStorage.getItem(`Timeprogress${user_ID}`))||[0,0];
    console.log(progresses)
    done = progresses[0];
    total = progresses[1];
    progLabel.textContent = `${done} out of ${total} done`;
    if(total==0){
        progressBar.value = 0;
    }
    else{
    percent = (done/total)*100;
    progressBar.value = `${percent}`;
    }
}

function loadUser (){
    let welcome = document.getElementById("welcome");

    let user_ID = JSON.parse(sessionStorage.getItem("currentUser")).c_user_ID;


    let user = JSON.parse(sessionStorage.getItem("currentUser")).c_username;

    welcome.textContent = `Welcome, ${user}`;

    return user_ID;
}

let logout = document.getElementById("logout");

logout.addEventListener("click", function(){
    sessionStorage.setItem("currentUser",JSON.stringify(""));
    window.location.replace('index.html');
})