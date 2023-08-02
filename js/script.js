
let tasks = [
    {
        title:" قراءةكتاب",
        date:"20/10/2023",
        isDone: true,
    },
    {
        title:"لعب كرة قدم",
        date:"20/10/2023",
        isDone: false,
    }
]
let retrievedTasks = JSON.parse(localStorage.getItem("tasksArr"))
if(retrievedTasks == null){
    tasks = []
}else{
    tasks = retrievedTasks
}

function addingElementsToPage(){
    let index=0 //counter so we can choose specific btn while clicking

    document.getElementById("tasks").innerHTML=""
    for(let task of tasks){
        document.getElementById("tasks").innerHTML += `
        <div class="task ${task.isDone? "done":""}">
            <!-- ..............................tasks info.................-->
            <div style="width: 60%;">
                <h2>${task.title}</h2>
                <div>
                    <span class="material-symbols-outlined">
                        calendar_month
                    </span>
                    <span>${task.date}</span>
                </div>
            </div>
            
            <!-- ........................... //tasks info// ...............-->

            <!--.............................tasks action ..................-->
            <div style=" width: 30%; display: flex;
                justify-content: space-between; align-items: center;">

                <!--...................... delete btn ......................-->
                <button onclick="deleteTask(${index})" id="delete" style="background-color: brown; color: white;">
                    <span class="material-symbols-outlined" style="line-height: 40px; ">
                        delete
                    </span>
                </button>

                <!--................... done and undone btn ................-->
                ${task.isDone? `
                <button onclick="toggleDone(${index})"  style="background-color: rgb(118 , 0 , 101); color: white;">
                <span class="material-symbols-outlined" style="line-height: 40px; ">
                    close
                </span>
                </button>

                ` : `
                    <button onclick="toggleDone(${index})"  style="background-color: green; color: white;">
                    <span class="material-symbols-outlined" style="line-height: 40px; ">
                        check
                    </span>
                    </button>
                `}
        
                <!--...................... edit btn .......................-->
                <button onclick="editTask(${index})"  style="background-color: #4646e1; color: white;">
                    <span class="material-symbols-outlined" style="line-height: 40px; ">
                        edit
                    </span>
                </button>
            </div>
            <!-- ..........................//tasks action// ..................-->
        </div>
        `
        index++ //increase counter
    }

}
addingElementsToPage()

document.getElementById("add-btn").onclick=function(){
    let taskName = prompt('enter your task here');
    let now = new Date()
    let time = now.getDate() + '/' + (now.getMonth()+1) + '/' +
     now.getFullYear() + ' | ' + now.getHours() + ':' + now.getMinutes()
     if (taskName != null && taskName != ""){
            tasks.push({
            title:taskName,
            date:time,
            isDone:false
        })
     }
    

    storageTasks()
    
    addingElementsToPage()
}

function deleteTask(index){
    let isConfired = confirm('هل تريد حذف :'+tasks[index].title)
    if(isConfired){
        tasks.splice(index,1)
    }
    storageTasks()
    addingElementsToPage()
}

function editTask(index){
    tasks[index].title= prompt("اكتب اسم المهمة الجديدة:",tasks[index].title)
    storageTasks()
    addingElementsToPage()
}

function toggleDone(index){
    tasks[index].isDone = !tasks[index].isDone
    // if(tasks[index].isDone){
    //     tasks[index].isDone = false
    // }else{
    //     tasks[index].isDone=true
    // }
    storageTasks()
    addingElementsToPage()
    
}

function storageTasks(){
    let stringifyTasks = JSON.stringify(tasks)
    localStorage.setItem("tasksArr",stringifyTasks)
}