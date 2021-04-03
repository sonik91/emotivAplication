const express = require('express')
const cors = require('cors')
const Cortex = require("../Class/Cortex");

//initialise pour le serveur express
const app = express()
app.use(cors())
const portServeur = 8080;
//initialiser cortex
let c = new Cortex;

let etatCervaux = {//intialise etat cervaux
    "engagement": {"etat": false, "valeur": null},
    "exitement": {"etat": false, "valeur": null},
    "focus": {"etat": false, "valeur": null},
    "interesement": {"etat": false, "valeur": null},
    "relaxation": {"etat": false, "valeur": null},
    "stress": {"etat": false, "valeur": null},
    "time": 0
};

let ondeCervaux = {
    "af3": {"alpha":0,"betaFaible":0,"betaElever":0,"gamma":0,"theta":0},
    "t7": {"alpha":0,"betaFaible":0,"betaElever":0,"gamma":0,"theta":0},
    "pz": {"alpha":0,"betaFaible":0,"betaElever":0,"gamma":0,"theta":0},
    "t8": {"alpha":0,"betaFaible":0,"betaElever":0,"gamma":0,"theta":0},
    "af4": {"alpha":0,"betaFaible":0,"betaElever":0,"gamma":0,"theta":0}, 
    "time":0  
}

//ouvre le serveur
app.listen(portServeur, () => {
    console.log('Serveur ouver')
  })
//envoie les donner quand on interoge le serveur
  app.get('/etat', (req,res) => {
    res.status(200).json(etatCervaux)
})

app.get('/onde', (req,res) => {
    res.status(200).json(ondeCervaux)
})


/*
mot: Les données de mouvement du casque.
dev: Les données de l'appareil provenant du casque. Il comprend le niveau de la batterie, la force du signal sans fil et la qualité de contact de chaque capteur EEG.
pow: La puissance de bande de chaque capteur EEG. Il comprend les bandes alpha, bêta faible, bêta élevée, gamma et thêta. 
met: Les résultats de la détection des mesures de performance.
com: Les résultats de la détection des commandes mentales. Vous devez charger un profil pour obtenir des résultats significatifs.
fac: Les résultats de la détection des expressions faciales.
sys: Les événements du système. Ces événements sont liés à l'apprentissage des commandes mentales et des expressions faciales. Voir BCI pour plus de détails.
*/

let stream = ["met","pow"];
let profileName = "pierre";//le nom de votre profil sur emotiv BCI

c.sub(stream);
c.live(profileName);

c.socket.on("message", (data)=>{
    data = JSON.parse(data);
    //console.log(data)
    if(typeof data.met != "undefined"){etatStress(data)}//si on recois une commande mental
    if(typeof data.pow != "undefined"){betafaible(data)}

});

function betafaible(data){
    const miseEnFomeOnde = {
        "af3": {"alpha":data.pow[0],"betaFaible":data.pow[1],"betaElever":data.pow[2],"gamma":data.pow[3],"theta":data.pow[4]},
        "t7": {"alpha":data.pow[5],"betaFaible":data.pow[6],"betaElever":data.pow[7],"gamma":data.pow[8],"theta":data.pow[9]},
        "pz": {"alpha":data.pow[10],"betaFaible":data.pow[11],"betaElever":data.pow[12],"gamma":data.pow[13],"theta":data.pow[14]},
        "t8": {"alpha":data.pow[15],"betaFaible":data.pow[16],"betaElever":data.pow[17],"gamma":data.pow[18],"theta":data.pow[19]},
        "af4": {"alpha":data.pow[20],"betaFaible":data.pow[21],"betaElever":data.pow[22],"gamma":data.pow[23],"theta":data.pow[24]},
        "time": data.time  
    }

    ondeCervaux = miseEnFomeOnde;
    console.log(ondeCervaux);
}

function etatStress(data){
    /*
    data.met = tableau:
    1. engagement
    2. Exitement
    3. focus
    4. interesement
    5. relaxation
    6. stress
    */  
    const etat = {
        "engagement": {"etat": data.met[0], "valeur": data.met[1]},
        "exitement": {"etat": data.met[2], "valeur": data.met[3]},
        "focus": {"etat": data.met[11], "valeur": data.met[12]},
        "interesement": {"etat": data.met[9], "valeur": data.met[10]},
        "relaxation": {"etat": data.met[7], "valeur": data.met[8]},
        "stress": {"etat": data.met[5], "valeur": data.met[6]},
        "time": data.time,
        "betafaible" : etatCervaux.betafaible
    }

    etatCervaux = etat;

    console.log(etat);

}