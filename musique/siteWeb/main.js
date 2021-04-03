const elementaudio = document.getElementById("elementAudio");
//elementaudio.playbackRate = 1;
const adresseApi = "192.168.1.85:8080";
const nombreEchantilonage = 10;
let echantillonage = [];

apelleApi();

function apelleApi(){
      var x = new XMLHttpRequest();
      x.open("GET", "http:localhost:8080/onde", true);
      x.onload = (e)=>{traitementdonner(JSON.parse(e.target.response));}
      x.send()
}

function traitementdonner(data){
    console.log(data)
    
    if(data.time != 0){
        //console.log(data);
        let valeurUtiliser = ((data.af3.alpha+data.af4.alpha)/2)*0.1
        console.log(valeurUtiliser);
        valeurUtiliser = valeurUtiliser>4?4:valeurUtiliser;
        elementaudio.playbackRate = valeurUtiliser;
    }
    else{
        elementaudio.playbackRate = 0;
    }

    setTimeout(()=>{apelleApi()},100);

}

