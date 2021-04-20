const CleAPI = 'f746b43b8956d7b9e269c7c4cf790acc'; // On utilise notre propre clé d'API  https://openweathermap.org/
let resultatsAPI;

const localisation = document.querySelector('.localisation');
const temperature = document.querySelector('.temperature');
const temps = document.querySelector('.temps');
const pression = document.querySelector('.pression');
const humidite = document.querySelector('.humidite');
const heures = document.querySelectorAll('.heure-prevision');
const temperatures = document.querySelectorAll('.valeur-prevision');
const jours = document.querySelectorAll('.jour-prevision');
const tempJours = document.querySelectorAll('.temp-prevision');
const imgIcone = document.querySelector('.logo-meteo');
const blocIcon = document.querySelectorAll('.bloc-icon');
const chargementContainer = document.querySelector('.icone-chargement');
const imgChargementContainer = document.querySelector('.image-chargement');

chargeImg()
submitForm()

///////////animation input///////////////
const rechercheInput = document.querySelector('#recherche');

rechercheInput.addEventListener('input', function (ev) {
    if(ev.target.value !== "") {
        ev.target.parentNode.classList.add('active-input');
    } else if (ev.target.value === "") {
        ev.target.parentNode.classList.remove('active-input');
    }
})
////////////////////////////////////////

function submitForm() {
    document.querySelector('#form').addEventListener('submit', (ev) => {
        ev.preventDefault()
        cityAppelAPI(document.querySelector('#recherche').value)
    })
}

function cityAppelAPI() {
    
    let city = document.querySelector('#recherche').value

    fetch(`https://api.openweathermap.org/data/2.5/weather?exclude=minutely&units=metric&lang=fr&q=${city}&appid=${CleAPI}`)
        .then(reponse => reponse.json())
        .then((data) => {
            console.log(data);
            /*{coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 10000, …}
                base: "stations"
                clouds: {all: 75}
                cod: 200
                coord: {lon: 5.5, lat: 43.3333}
                dt: 1613251333
                id: 2995468
                main: {temp: 6.51, feels_like: 3.11, temp_min: 3, temp_max: 8.89, pressure: 1029, …}
                name: "Marseille"
                sys: {type: 1, id: 6512, country: "FR", sunrise: 1613198341, sunset: 1613235936}
                timezone: 3600
                visibility: 10000
                weather: [{…}]
                wind: {speed: 2.57, deg: 320}
                __proto__: Object*/

            resultatsAPI = data;   

            localisation.innerText = resultatsAPI.name;   
            temperature.innerText = `${Math.trunc(resultatsAPI.main.temp)} c°`  
            temps.innerText = resultatsAPI.weather[0].description;   
            pression.innerText = `${resultatsAPI.main.pressure} hPa`; 
            humidite.innerText = `${resultatsAPI.main.humidity} %`;  

            let lon = resultatsAPI.coord.lon;  
            let lat = resultatsAPI.coord.lat;
            appelAPI(lon, lat)
        }) 
    }

function appelAPI(lon, lat) {
        
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${CleAPI}`)
        .then(reponse => reponse.json())
        .then((data) => {
            console.log(data);
            resultatsAPI = data; 

            let heureActuelle = new Date().getHours();  

            for(let i = 0; i < heures.length; i++) {  

                let heureIncr = heureActuelle + i * 2; 
            
                if(heureIncr > 24) {                 
                    heures[i].innerText = `${heureIncr - 24} h`;  
                } else if(heureIncr === 24) {        
                    heures[i].innerText = "00 h"     
                } else {                            
                    heures[i].innerText = `${heureIncr} h`;  
                }
            }

            for(let j = 0; j < temperatures.length; j++) {  
                temperatures[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 2].temp)} c°`  
            }

            //  Les jours de la semaine et temperature pour 7 jours 

            for(let k = 0; k < joursEnOrdre.length; k++) { 
                jours[k].innerText = joursEnOrdre[k].slice(0,3);  
            }

            for(let m = 0; m < 7; m ++) {
                tempJours[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)} c°` 
                blocIcon[m].src = `ressources/${resultatsAPI.daily[m + 1].weather[0].icon}.svg`
            }

            imgIcone.src = `ressources/${resultatsAPI.current.weather[0].icon}.svg`

            chargementContainer.classList.add('disparition');
        })
}    

/////////////animation image/////////////

function chargeImg() {

    let heureActuelle = new Date().getHours();

    if(heureActuelle >= 11 && heureActuelle < 16) {
        imgChargementContainer.src = `ressources/ciel-jour.jpg`;
        console.log(imgChargementContainer);
    } else if((heureActuelle >= 6 && heureActuelle < 11) || (heureActuelle >= 16 && heureActuelle < 19)) {
        imgChargementContainer.src = `ressources/ciel.jpg`;
        console.log(imgChargementContainer);
    } else {
        imgChargementContainer.src = `ressources/ciel-nuit.jpg`;
        console.log(imgChargementContainer);
    }
}
//////////////////////////////////////////

const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']; // On définit un constant et sa valeur est tableau qui contient les jours de la semaine

let aujourdhui = new Date();  // On déclare un variable et sa valeur est la date actuelle (constucteur new Date)

let options = {weekday: 'long'};  // On déclare un variable qui contient un objet (les jours de week-end)

let jourActuel = aujourdhui.toLocaleDateString('fr-FR', options);  // On demande le jour actuelle entier (en obsion long) en langue français. La méthode toLocaleDateString() renvoie une chaine de caractères correspondant à la date (le fragment de l'objet qui correspond à la date : jour, mois, année) exprimée selon une locale. 

//console.log(jourActuel, aujourdui);    // jeudi Thu Dec 17 2020 17:29:11 GMT+0100 (heure normale d’Europe centrale)

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1); //On affiche en majuscule premier lettre (0) de chaque jour et on lui ajoute le reste de mot (L + undi)
// La méthode charAt() renvoie une nouvelle chaîne contenant le caractère à la position indiquée en argument.
// La méthode toUpperCase() retourne la valeur de la chaîne courante, convertie en majuscules.
// La méthode slice() renvoie un objet tableau, contenant une copie superficielle d'une portion du tableau d'origine, la portion est définie par un indice de début et un indice de fin. Le tableau original ne sera pas modifié.

//console.log(jourActuel);

let joursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
/* Avec slice on va découper notre tableau qui contient les jours de la semaine, il nous faut un debut et une fin, 
le debut est l'index de joursActuel, puis on va concaténer avec nouveau tableau jusqu'à jour actuel, example :  si on est mercredi, 
avec slice on découpe notre tableau qui contient les jours de la semaine mais par ordre (lun, mar, mer, jeu, ven, sam, dim),
joursSemaine.indexOf(jourActuel) nous retourne mercredi, jeudi, vendredi, samedi et dimanche,  on rajoute avec concat nouveau tableau, 
des le premier element (0) jusqu'à jour actuel, donc lundi et mardi */

//console.log(joursEnOrdre);


        