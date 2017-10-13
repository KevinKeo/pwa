const sessionIdParam = "sessionid";
const sessionsJsonLink = "https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json";
function getAllTitle(){
    fetch(sessionsJsonLink)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function(responseAsJson) {
    // traitement de l'objet
        var ul = document.getElementById('liste');
        for(var i in responseAsJson)
        {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute("href","/html/conference?"+sessionIdParam+"="+responseAsJson[i].id);
            a.innerHTML=responseAsJson[i].title;
            li.appendChild(a);
            ul.appendChild(li);
        }
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}

function renderInfoSessionById(){
    fetch(sessionsJsonLink)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // lecture du corps de la réponse en tant que JSON.
            return response.json();
        })
        .then(function(responseAsJson) {
            // traitement de l'objet
            var session;
            var id = findGetParameter(sessionIdParam);
            for(var i in responseAsJson){
                if(responseAsJson[i].id == id) {
                    session = responseAsJson[i];
                    break;
                }
            }
            document.getElementById('title').innerHTML = session.title ?  session.title : "No Title";
            document.getElementById('description').innerHTML = session.description ? session.description : "No Description";
            var newUl = document.createElement('ul');
            document.getElementById('presentateurs').appendChild(newUl);
            if(session.speakers){
                session.speakers.forEach(function(speaker) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.setAttribute("href","/html/presentateur?"+speakerIdParam+"="+speaker);
                    getSpeakerById(speaker).then(function(speakerObject){
                        a.innerHTML = speakerObject.name;
                    })
                    a.innerHTML=speaker;
                    li.appendChild(a);
                    newUl.appendChild(li);
                })
            }
            document.getElementById("linknotes").setAttribute("href","/html/notes?"+sessionIdParam+"="+id);
        })
        .catch(function(error) {
            console.log('Une erreur est survenue : ', error);
    });
}

function getAllSessionBySpeakerId(speakerid){
    return fetch(sessionsJsonLink)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function(responseAsJson) {
    // traitement de l'objet
        var sessions = [];
        for(var i in responseAsJson)
        {
            for (var j = 0; responseAsJson[i].speakers && j < responseAsJson[i].speakers.length; j++){
                if (responseAsJson[i].speakers[j] == speakerid) 
                    {
                        sessions.push(responseAsJson[i]);
                        break;
                    }
            }            
        }
        return sessions;
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}

function findGetParameter(parameterName) {
    var param = new URLSearchParams(window.location.search);
    return param.get(parameterName);
}

function getSessionById(id){
    return fetch(sessionsJsonLink)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function(responseAsJson) {
        for(var i in responseAsJson)
        {
           if(responseAsJson[i].id == id) return responseAsJson[i];
        }
        return ;
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}