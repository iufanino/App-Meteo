
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


if(navigator.geolocation) {  // Si le navigateur a la fonctionnalité de géolocalisation
    navigator.geolocation.getCurrentPosition(position => { // La méthode getCurrentPosition() fournit la position actuelle

        /*console.log(position);    /*GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1608202280986}
                                        coords: GeolocationCoordinates
                                            accuracy: 379396
                                            altitude: null
                                            altitudeAccuracy: null
                                            heading: null
                                            latitude: 43.8927232
                                            longitude: 3.2827625
                                            speed: null  */
         
        // On va extrer latitude et longitude, on va les mettre dans les variables et on va appeler une méthode qu'on va crée en passanent latitude et longitude en argument                
        let lon = position.coords.longitude;  
        let lat = position.coords.latitude;
       
        AppelAPI(lon,lat);                                

        }, () => {   //Mais si on refuse, c'est notre seconde argument va être pris en compte qui est fonction fleché

        alert(`L'application ne peur pas fonctionner, vous avez refusé la géolocalisation. Veuillez l'activer !`) 
    })
}

function AppelAPI(lon, lat) {  // On crée la fonction qu'on a appelé en haut, ces paramétre sont notre latitude et longitude
        
        //console.log(lon, lat);   // 5.362561899999999 43.3717173
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&q=marseille,fr&appid=${CleAPI}`)
        
        .then((reponse) => {  // On encheine une autre promese, then prendre la reponse de notre promese en haut, la reponse de notre API 
           
            return reponse.json();  // Et elle va nous retourner nos données, notre reponse, mais en format json, c'est juste pour changer le format de notre reponse API
        })

        // .then(reponse => reponse.json())    

        .then((data) => {    // c'est égale reponse en json

            /*console.log(data);  */     /* {lat: 43.37, lon: 5.36, timezone: "Europe/Paris", timezone_offset: 3600, current: {…}, …}
                                            current: {dt: 1608630366, sunrise: 1608620912, sunset: 1608653160, temp: 11.09, feels_like: 10.39, …}
                                            daily: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                                            hourly: (48) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                                            lat: 43.37
                                            lon: 5.36
                                            timezone: "Europe/Paris"
                                            timezone_offset: 3600
                                            __proto__: Object   */


            resultatsAPI = data;    // Notre variable resultatsAPI est égale aux données de reponse API


            // Afficher les informations corespondent dans le premier bloc d'info

            localisation.innerText = resultatsAPI.name;   // Le text de notre variable localisation est égale de timezone dans le reponse API
            temperature.innerText = `${Math.trunc(resultatsAPI.main.temp)} c°` // Le text de notre variable temperature est égale le temp de current, dans le reponse API 
            // La fonction Math.trunc() retourne notre chiffre en entière 
            temps.innerText = resultatsAPI.weather[0].description;   // Le text de notre variable temps est égale le description de weather, dans le reponse API


            // Afficher les informations corespondent dans le deuxieme bloc d'info

            pression.innerText = `${resultatsAPI.main.pressure}hPa`; // Le text de notre variable pression est égale de pressure de current dans le reponse API
            humidite.innerText = `${resultatsAPI.main.humidity}%`;    // Le text de notre variable humidite est égale de humidity de current dans le reponse API
        })

        // Méthode fetch nous permets de faire la requete http et prendre les données depuis cet API, il nous retourne une promese
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${CleAPI}`)
        
        .then((reponse) => {  // On encheine une autre promese, then prendre la reponse de notre promese en haut, la reponse de notre API 
           
            return reponse.json();  // Et elle va nous retourner nos données, notre reponse, mais en format json, c'est juste pour changer le format de notre reponse API
        })

        // .then(reponse => reponse.json())    

        .then((data) => {    // c'est égale reponse en json

            /*console.log(data);*/       /* {lat: 43.37, lon: 5.36, timezone: "Europe/Paris", timezone_offset: 3600, current: {…}, …}
                                            current: {dt: 1608630366, sunrise: 1608620912, sunset: 1608653160, temp: 11.09, feels_like: 10.39, …}
                                            daily: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                                            hourly: (48) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                                            lat: 43.37
                                            lon: 5.36
                                            timezone: "Europe/Paris"
                                            timezone_offset: 3600
                                            __proto__: Object   */


            resultatsAPI = data;    // Notre variable resultatsAPI est égale aux données de reponse API


            ///// On affiche l'infos dans notre bloc-heure-prevision

            // On affiche les heures

            let heureActuelle = new Date().getHours();  // On utilise le constructeur new Date pour avoir la date actuelle et la méthode getHours nous donne l'heure actuelle 

            for(let i = 0; i < heures.length; i++) {  // On va faire iteration qui nous donne le tableau des heures 

                let heureIncr = heureActuelle + i * 2; // On va declarer nouvelle variable qui est égale l'heure actuelle multiplier par deux
            
                if(heureIncr > 24) {                 // Si l'heure est superieur à 24
                    heures[i].innerText = `${heureIncr - 24} h`;  // Alors pour le text de notre variable heures on mets moins 24 
                } else if(heureIncr === 24) {        // Si l'heure est strictement égale à 24
                    heures[i].innerText = "00 h"     // Alors le text de notre variable heures est égale à OO h
                } else {                             // Si non
                    heures[i].innerText = `${heureIncr} h`;  // Le text de notre variable heures est égale de l'heure qui va s'incrimenter, donc l'heure actuelle, puis deux heures de plus, puis encore deux heures de plus ect
                }
            }

            // On affiche les temperature

            for(let j = 0; j < temperatures.length; j++) {  // // On va faire iteration pour avoir le temperature par heure 
                temperatures[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 2].temp)} c°`  // Le text de notre variable temperatures est égale le temp de hourly, moultiplier par deux, dans le reponse API
            }

            ////////: On affiche l'infos dans notre bloc-jour-prevision

            // On affiche trois premieres lettres des jours 

            for(let k = 0; k < joursEnOrdre.length; k++) {   
                jours[k].innerText = joursEnOrdre[k].slice(0,3);  // Le text de notre variable jours est égale tremier trois lettres de notre variable joursEnOrdre, on a découpé les mot avec slice pour avoir juste trois lettre à chaque fois
            }

            // On affiche temp par jour

            for(let m = 0; m < 7; m ++) {
                tempJours[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)} c°`  // Le text de notre variable tempJours (temperature pour les jours de la semaine) est égale le temp de daily, dans le reponse API

            // Les petits icone en fonction de temps qu'il fait 

                blocIcon[m].src = `ressources/${resultatsAPI.daily[m +1].weather[0].icon}.svg`
            }

            // Icone dynamique au centre

            /*if(heureActuelle >= 6 && heureActuelle < 19) {
                imgIcone.src = `ressources/${resultatsAPI.current.weather[0].icon}.svg`
            } else  {
                imgIcone.src = `ressources/${resultatsAPI.current.weather[0].icon}.svg`
            }*/
    
            imgIcone.src = `ressources/${resultatsAPI.current.weather[0].icon}.svg`
            
            chargementContainer.classList.add('disparition');
        })
}

const joursSemaine = ['lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']; // On définit un constant et sa valeur est tableau qui contient les jours de la semaine

let ajd = new Date();  // On déclare un variable ajd (aujourd'hui),et sa valeur est la date actuelle (constucteur new Date)

let options = {weekday: 'long'};  // On déclare un variable qui contient un objet (les jours de week-end)

let jourActuel = ajd.toLocaleDateString('fr-FR', options);  // On demande le jour actuelle entier (en obsion long) en langue français. La méthode toLocaleDateString() renvoie une chaine de caractères correspondant à la date (le fragment de l'objet qui correspond à la date : jour, mois, année) exprimée selon une locale. 

//console.log(jourActuel, ajd);    // jeudi Thu Dec 17 2020 17:29:11 GMT+0100 (heure normale d’Europe centrale)

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1); //On affiche en majuscule premier lettre (0) de chaque jour et on lui ajoute le reste de mot (L + undi)
// La méthode charAt() renvoie une nouvelle chaîne contenant le caractère à la position indiquée en argument.
// La méthode toUpperCase() retourne la valeur de la chaîne courante, convertie en majuscules.
// La méthode slice() renvoie un objet tableau, contenant une copie superficielle d'une portion du tableau d'origine, la portion est définie par un indice de début et un indice de fin. Le tableau original ne sera pas modifié.



let joursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
/* Avec slice on va découper de notre tableau qui contient les jours de la semaine, il nous faut un debut et une fin, 
le debut est l'index de joursActuel, puis on va concaténer avec nouveau tableau jusqu'à jour actuel, example :  si on est mercredi, 
avec slice on découpe notre tableau qui contient les jours de la semaine mais par ordre (lun, mar, mer, jeu, ven, sam, dim),
joursSemaine.indexOf(jourActuel) nous retourne mercredi, jeudi, vendredi, samedi et dimanche,  on rajoute avec concat nouveau tableau, 
des le premier element (0) jusqu'à jour actuel, donc lundi et mardi */
// console.log(joursEnOrdre);

SubmitFormm()

function SubmitFormm() {
    document.querySelector('#form').addEventListener('submit', (ev) => {
        ev.preventDefault()
        cityAppelAPI(document.querySelector('#search').value)
    })
}

function cityAppelAPI() {
    let city = document.querySelector('#search').value
    fetch(`https://api.openweathermap.org/data/2.5/weather?exclude=minutely&units=metric&lang=fr&q=${city},fr&appid=${CleAPI}`)
        .then(reponse => reponse.json())
        .then((data) => {
            console.log(data);
            resultatsAPI = data;   
        })
}
