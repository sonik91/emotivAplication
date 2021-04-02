/*
obtener une licence gratuite sur : https://www.emotiv.com/developer/
cree une nouvelle api sans cocher "EEG access" sur https://www.emotiv.com/my-account/cortex-apps/

rentrer les parametre dans class/config.js
telecharger dans votre carte arduino Class/voitureArduino.ino

conecter votre casque emotiv a l'aplication cortex fournie par emotiv : https://www.emotiv.com/

si vous utiliser l'extension arduino pour developer en ligne => la metre en pause
*/
const Cortex = require("./Class/Cortex");
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const config = require("./Class/config");

let dernierCommandeEnvoyerArduino = 0;//variable de temps pour ne pas surcharger le serial.port de l'arduino

//initialiser le serial port avec arduino
const port = new SerialPort(config.serial.port, { baudRate: config.serial.vitesse });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
// Read the port data
port.on("open", () => {console.log('serial port open');});
parser.on('data', data =>{console.log('got word from arduino:', data);});

//initialiser cortex
let c = new Cortex;
/*
mot: Les données de mouvement du casque.
dev: Les données de l'appareil provenant du casque. Il comprend le niveau de la batterie, la force du signal sans fil et la qualité de contact de chaque capteur EEG.
pow: La puissance de bande de chaque capteur EEG. Il comprend les bandes alpha, bêta faible, bêta élevée, gamma et thêta. 
met: Les résultats de la détection des mesures de performance.
com: Les résultats de la détection des commandes mentales. Vous devez charger un profil pour obtenir des résultats significatifs.
fac: Les résultats de la détection des expressions faciales.
sys: Les événements du système. Ces événements sont liés à l'apprentissage des commandes mentales et des expressions faciales. Voir BCI pour plus de détails.
*/

let stream = ["com"];
let profileName = "pierre";//le nom de votre profil sur emotiv BCI

c.sub(stream);
c.live(profileName);

c.socket.on("message", (data)=>{
    data = JSON.parse(data);
    //console.log(data)
    if(typeof data.com != "undefined"){commandeMentale(data)}//si on recois une commande mental
});



function commandeMentale(data){
    const pin = 1;
    if(Number(dernierCommandeEnvoyerArduino+pin) < Number(data.time)){
        dernierCommandeEnvoyerArduino = data.time;
        console.log(data.com)
        
        //example commande et l'information envoyer sur le port serie de l'arduino
        let commande = [["push","1"], ["pull", "5"], ["left","4"], ["right","3"]]
        let puissanceMin = 0.4//force minimal de la commande mental

        let stop = true;

        commande.forEach((e)=>{
            if(data.com[0] === e[0] && data.com[1]>= puissanceMin){
                stop = false;
                port.write(e[1], (err)=>{
                    if(err){console.log(err)}
                })
            }
        })

        if(stop){
            port.write("2", (err)=>{
                if(err){console.log(err)}
            })
        }
    }
}


