function addNotes(){
    var id = findGetParameter(sessionIdParam);
    if (typeof(Storage) !== "undefined" && id) {
        localStorage.setItem(id, document.getElementById('note').value);
    } else {
        // Sorry! No Web Storage support..
    }
}

function renderNotesHTML(){
    var id = findGetParameter(sessionIdParam);
    if(id){
        getSessionById(id).then(function(session){
            document.getElementById('title').innerHTML = session.title;
            document.getElementById('sessionlink').setAttribute('href','/html/conference?'+sessionIdParam+"="+session.id);
        })
        document.getElementById("note").innerHTML = localStorage.getItem(id);
    }
}