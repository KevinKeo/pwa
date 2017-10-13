const speakerIdParam = "speakerid";
const speakersJsonLink = "https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json";

function getAllSpeakers(){
    fetch(speakersJsonLink)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function(responseAsJson) {
    // traitement de l'objet
        var ul =document.getElementById('liste');
        for(var i in responseAsJson)
        {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute("href","/html/presentateur?"+speakerIdParam+"="+responseAsJson[i].id);
            a.innerHTML=responseAsJson[i].name;
            li.appendChild(a);
            ul.appendChild(li);
        }
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}

function getSpeakerById(id){
    return fetch(speakersJsonLink)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // lecture du corps de la réponse en tant que JSON.
        return response.json();
    })
    .then(function(responseAsJson) {
    // traitement de l'objet
        for (var i in responseAsJson) {
            if(responseAsJson[i].id == id){
                  return responseAsJson[i];
            }
        }
        return responseAsJson[i];
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}

function renderInfoSpeakerById(){
    fetch(speakersJsonLink)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // lecture du corps de la réponse en tant que JSON.
            return response.json();
        })
        .then(function(responseAsJson) {
            // traitement de l'objet
            var speaker;
            var id = findGetParameter(speakerIdParam);
            for(var i in responseAsJson){
                if(responseAsJson[i].id == id) {
                    speaker = responseAsJson[i];
                    break;
                }
            }

            document.getElementById('name').innerHTML = speaker.name ?  speaker.name : "No Name";
            document.getElementById('shortBio').innerHTML = speaker.shortBio ? speaker.shortBio : "No Biography";
            var newUl = document.createElement('ul');
            document.getElementById('presentations').appendChild(newUl);
            getAllSessionBySpeakerId(id).then(function(sessions){
                sessions.forEach(function(session){
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.setAttribute("href","/html/conference?"+sessionIdParam+"="+session.id);
                    a.innerHTML = session.title;
                    li.appendChild(a);
                    newUl.appendChild(li);
                })
            })
        })
        .catch(function(error) {
            console.log('Une erreur est survenue : ', error);
    });
}