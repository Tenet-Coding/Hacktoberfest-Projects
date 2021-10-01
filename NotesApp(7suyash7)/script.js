+showNotes ();
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addNote);

function addNote (e) {
    {
    
        var addText = document.querySelector("#addtext");
        var notes = localStorage.getItem("notes");
        if(notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addText.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addText.value = "";
        showNotes ();
}}

function showNotes() {
    var notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    var html = "";
    notesObj.forEach(function(element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index +1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary delBtn">Delete Note</button>
        </div>
    </div>`; 
    });
    var notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
     notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Add a Note to see something here!`
    }
}

function deleteNote(index) {
    var notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})