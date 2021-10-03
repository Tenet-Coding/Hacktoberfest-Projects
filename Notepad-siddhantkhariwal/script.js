console.log("Welcome to wizard notes");
shownotes();

let addbtn = document.getElementById('addbtn');

addbtn.addEventListener("click",function(e){
    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    let myobj= {
        title: addtitle.value,
        Text: addtxt.value
    }

    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value="";
    addtitle.value="";

    shownotes();

});

function shownotes() {
    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }

    let html = "";

    notesobj.forEach(function(element,index){

        html += `
        
        <div class="shadow p-3 mb-5 bg-white rounded noteCard my-2 mx-2 card" style="width: 18rem; background-color:lavender;">
        <div class="card-body">
          <h5 class="card-title">${element.title} </h5>
          <p class="card-text">${element.Text}</p>
          <button id="${index}"onclick="deleteNote(this.id)" class="fancy-7 btn btn-primary">Delete note</button>
        </div>
      </div>`;

        
    });

    let noteselm = document.getElementById("notes");
    if(notesobj.length!=0){
        noteselm.innerHTML = html;
    }
    else{
        noteselm.innerHTML = `No notes are present at the moment! Use "Add a note" button above to add notes.`
    }

}


function deleteNote(index) {

    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index,1);

    localStorage.setItem("notes",JSON.stringify(notesobj));
    shownotes();
}


let search = document.getElementById("search");

search.addEventListener("input",function(){

let inputval = search.value;

let noteCard = document.getElementsByClassName('noteCard');

Array.from(noteCard).forEach(function(element){
    let cardtxt = element.getElementsByTagName('p')[0].innerText;

    if(cardtxt.includes(inputval)){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
        }

});

});