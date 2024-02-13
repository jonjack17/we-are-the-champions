import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://we-are-the-champions-c8cee-default-rtdb.firebaseio.com/"
}

let container = document.getElementById("hero")
const app = initializeApp(appSettings)
const database = getDatabase(app)
const postsInDB = ref(database, "posts")
const inputEl = document.getElementById("input-field")
const buttonEl = document.getElementById("publish-button")
const postListEl = document.getElementById("endorsement-list")


onValue(postsInDB, function(snapshot) {
    
    if (snapshot.exists()){
        clearDisplay()
        let postsArrayValues = Object.values(snapshot.val())
      
       
        
        for (let i = 0; i < postsArrayValues.length; i++){
            let displayedPost = document.createElement("li")
            displayedPost.textContent = postsArrayValues[i]
            postListEl.append(displayedPost)
        }
    } else {
       postListEl.textContent = "No posts here...yet!"
    }
   
})



function clearDisplay() {
    postListEl.textContent = ""
}
buttonEl.addEventListener("click", function() {

    let newPost = inputEl.value
    push(postsInDB, newPost)

    clearInput()
    thankYouMsg()
  
})

function clearInput(){
    inputEl.value = ""
}

let postResponse = document.createElement("p")

function thankYouMsg() {
 
    postResponse.textContent = "Thanks for your post!"
    
    container.insertBefore(postResponse, buttonEl)
    setTimeout(function(){
        postResponse.textContent = ""
    }, 5000)
}
   
